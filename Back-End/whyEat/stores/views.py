from rest_framework import viewsets
from .serializers import StoreSerializer, StoreScoreSerializer, StoreMenuSerializer
from .models import Store, Store_score, Store_menu
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from sqlalchemy import create_engine
import pandas as pd
import shutil
import sys
import numpy as np
from scipy import linalg
from scipy.sparse.linalg import svds
import json


@api_view(['GET', 'POST'])
def store_list(request):
    if request.method == 'GET':
        engine = create_engine(
            'mysql+pymysql://root:1234@localhost/mydb', convert_unicode=True)
        conn = engine.connect()
        final_df = pd.read_sql_table('stores_store_score', conn)
        # print(final_df.head)
        # final_df.rename(columns={'user_id': 'user'}, axis='columns')
        user_store_rating = final_df.pivot_table(
            'score', index='user_id', columns='store_name').fillna(0)
        # print(user_store_rating.head())
        # matrix는 pivot_table 값을 numpy matrix로 만드는 것
        matrix = user_store_rating.as_matrix()
        # user_rating_mean 은 사용자의 평균 평점
        user_ratings_mean = np.mean(matrix, axis=1)
        # matrix_user_mean 은 사용자-스토어에 대해 사용자 평균 평점을 뺀 것
        matrix_user_mean = matrix - user_ratings_mean.reshape(-1, 1)
        # 다시 df 처리
        # print(pd.DataFrame(matrix_user_mean, columns=user_store_rating.columns).head())
        # Python scipy에서 제공해주는 svd 사용
        # U행렬, sigma 행렬, V 전치행렬을 반환
        U, sigma, Vt = svds(matrix_user_mean, k=12)
        # print(U.shape)
        # print(sigma.shape)
        # print(Vt.shape)
        # SIGMA는 0이 아닌 값만 1차원 행렬로 표현도미
        # 즉, 0이 포함된 대칭행렬로 변환할 때는 numpy의 diag를 이용
        sigma = np.diag(sigma)
        # 현재까지
        # 1. user-store 평점 행렬 있음
        # 2. 이를 user의 평균점수를 빼서 matrix_user_mean 으로 만듬
        # 3. 2번의 값을 SVD 적용해 각 행렬을 구함
        # 4. Sigma 행렬은 현재 0이 포함이 되지 않은 값으로만 구성이 되어, 대칭행렬로 변환
        # 이제 해야할 것은 SVD로 분해한 것을 U, SIGMA, Vt의 내적을 통해 복구
        # 그리고 아까 평균 빼주었으니 이제 더해준다.

        svd_user_predicted_ratings = np.dot(
            np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
        df_svd_preds = pd.DataFrame(
            svd_user_predicted_ratings, columns=user_store_rating.columns)
        print(df_svd_preds)

        def recommend_stores(df_svd_preds, user_id, ori_stores_df, ori_ratings_df, num_recommendations=5):
            # 현재는 index로 적용 되어있는거라 -1 해줘야함
            user_row_number = user_id-1

            # 최종적으로 만든 df_svd_preds 에서 사용자 index에 따라 스토어 데이터 정렬
            sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(
                ascending=False)

            # 원본 평점 데이터에서 user id 에 해당하는 데이터를 뽑아낸다
            user_data = ori_ratings_df[ori_ratings_df.user_id == user_id]
            print(user_data)
            # 위에서 뽑은 user_data와 원본 스토어 데이터를 합친다.
            if not user_data.empty:
                user_history = user_data.merge(ori_stores_df, on='store_name').sort_values([
                    'score'], ascending=False)
                # 원본 스토어 데이터에서 사용자가 평점 남긴 스토어를 제외한 데이터를 추출
                recommendations = ori_stores_df[~ori_stores_df['store_name'].isin(
                    user_history['store_name'])]

                # 사용자의 스토어 평점이 높은 순으로 정렬된 데이터와 위 추천 합친다

                recommendations = recommendations.merge(pd.DataFrame(
                    sorted_user_predictions).reset_index(), on='store_name')

                # 컬럼 이름 바꾸고 정렬해서 return
                recommendations = recommendations.rename(
                    columns={user_row_number: 'Predictions'}).sort_values('Predictions')
            else:
                recommendations = ori_stores_df
                # 사용자의 스토어 평점이 높은 순으로 정렬된 데이터와 위 추천 합친다

                recommendations = recommendations.merge(pd.DataFrame(
                    sorted_user_predictions).reset_index(), on='store_name')

                # 컬럼 이름 바꾸고 정렬해서 return
                recommendations = recommendations.rename(
                    columns={user_row_number: 'Predictions'}).sort_values('Predictions')

            return recommendations
        result = recommend_stores(df_svd_preds, 10, final_df, final_df, 50)
        result.drop_duplicates(['store_name'])

        result = result.drop_duplicates(['store_name']).head(10)
        print(result)
        # print(result.drop_duplicates(['store_name']).head(10))
        print(type(result))
        result = result.to_json(orient='records')
        result2 = json.loads(result)

        return Response(result2, status=200)

        # return Response(serializer.data)
    else:
        serializer = StoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def store_detail(request, store_pk):
    store = get_object_or_404(Store, store_id=store_pk)
    if request.method == 'GET':
        serializer = StoreSerializer(store)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def score_list(request):
    if request.method == 'GET':
        score = Store_score.objects.all()
        serializer = StoreScoreSerializer(score, many=True)
        return Response(serializer.data)
    else:
        serializer = StoreScoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
