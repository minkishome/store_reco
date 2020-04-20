from parse import load_dataframes
import pandas as pd
import shutil
import sys
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy import linalg
from scipy.sparse.linalg import svds 


def sort_stores_by_score(dataframes, n=20, min_reviews=1):
    """
    Req. 1-2-1 각 음식점의 평균 평점을 계산하여 높은 평점의 음식점 순으로 `n`개의 음식점을 정렬하여 리턴합니다
    Req. 1-2-2 리뷰 개수가 `min_reviews` 미만인 음식점은 제외합니다.
    """
    # merge를 하면 공통 열을 기준으로 테이블이 합쳐짐
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

    stores_reviews = stores_reviews[stores_reviews.address.str.contains(
        '서울')]
    temp_num = [0] * 40484
    n = 0

    for row in stores_reviews['category']:

        if '제육' in row or '김치찌개' in row or '라면' in row or '밥'in row and temp_num[n] == 0:
            temp_num[n] = 1
            n += 1
        elif '돈까스'in row or '라멘' in row or '우동' in row and temp_num[n] == 0:
            temp_num[n] = 2
            n += 1
        elif '피자' in row and temp_num[n] == 0:
            temp_num[n] = 3
            n += 1
        elif '치킨' in row or '닭' in row or '오리' in row and temp_num[n] == 0:
            temp_num[n] = 4
            n += 1
        elif '떡볶이' in row or '김밥'in row and temp_num[n] == 0:
            temp_num[n] = 5
            n += 1
        elif '부대찌개' in row and temp_num[n] == 0:
            temp_num[n] = 6
            n += 1
        elif '회' in row or '횟집' in row or '물회' in row or '해물'in row or '참치'in row or '골뱅이'in row or '조개'in row and temp_num[n] == 0:
            temp_num[n] = 7
            n += 1
        elif '파스타' in row or '스파게티' in row and temp_num[n] == 0:
            temp_num[n] = 8
            n += 1
        elif '곱창' in row or '막창' in row and temp_num[n] == 0:
            temp_num[n] = 9
            n += 1
        elif '삼겹살' in row or'돼지' in row or'고기' in row or '정육'in row or '고깃'in row and temp_num[n] == 0:
            temp_num[n] = 10
            n += 1
        elif'중식' in row or'짜장' in row or '짬뽕' in row or '중국'in row or '탕수육'in row and temp_num[n] == 0:
            temp_num[n] = 11
            n += 1
        elif'갈비' in row and temp_num[n] == 0:
            temp_num[n] = 12
            n += 1
        elif '카페' in row or'cafe' in row or '빵' in row or '디저트'in row or 'CAFE'in row and temp_num[n] == 0:
            temp_num[n] = 13
            n += 1
        elif '감자탕'in row or '뼈해장국'in row or'순대' in row or'순댓' in row or '국밥'in row or '탕'in row or '찌개'in row and temp_num[n] == 0:
            temp_num[n] = 14
            n += 1
        elif '초밥'in row and temp_num[n] == 0:
            temp_num[n] = 15
            n += 1
        elif'족발' in row or'보쌈' in row and temp_num[n] == 0:
            temp_num[n] = 16
            n += 1
        elif'소' in row or '스테이크' in row or '한우'in row and temp_num[n] == 0:
            temp_num[n] = 17
            n += 1
        elif '국수'in row or '수제비' in row and temp_num[n] == 0:
            temp_num[n] = 18
            n += 1
        elif'이자카야' in row or '포차' in row or '펍' in row and temp_num[n] == 0:
            temp_num[n] = 19
            n += 1
        elif'맥주' in row and temp_num[n] == 0:
            temp_num[n] = 20
            n += 1
        elif'와인' in row and temp_num[n] == 0:
            temp_num[n] = 21
            n += 1
        elif'만두' in row and temp_num[n] == 0:
            temp_num[n] = 22
            n += 1
        elif'냉면' in row and temp_num[n] == 0:
            temp_num[n] = 23
            n += 1
        elif'쌀국수' in row and temp_num[n] == 0:
            temp_num[n] = 24
            n += 1
        elif'닭발' in row and temp_num[n] == 0:
            temp_num[n] = 25
            n += 1
        elif '양'in row or '마라탕' in row and temp_num[n] == 0:
            temp_num[n] = 26
            n += 1
        elif '뷔페' in row or '부페' in row and temp_num[n] == 0:
            temp_num[n] = 27
            n += 1
        elif '햄버거' in row or '샌드위치' in row and temp_num[n] == 0:
            temp_num[n] = 28
            n += 1
        else:
            n += 1

    # print(temp_num)
    stores_reviews['category_num'] = temp_num
    final_df = stores_reviews[['user', 'store_name', 'score', 'category_num']]
    final_df = final_df[final_df.category_num != 0]
    user_store_rating = final_df.pivot_table('score',index = 'user', columns='store_name').fillna(0)
    # print(user_store_rating.head())
    # matrix는 pivot_table 값을 numpy matrix로 만드는 것
    matrix = user_store_rating.as_matrix()
    # user_rating_mean 은 사용자의 평균 평점
    user_ratings_mean = np.mean(matrix, axis = 1)
    # matrix_user_mean 은 사용자-스토어에 대해 사용자 평균 평점을 뺀 것
    matrix_user_mean = matrix - user_ratings_mean.reshape(-1,1)
    # 다시 df 처리 
    # print(pd.DataFrame(matrix_user_mean, columns=user_store_rating.columns).head())
    # Python scipy에서 제공해주는 svd 사용
    # U행렬, sigma 행렬, V 전치행렬을 반환 
    U, sigma, Vt = svds(matrix_user_mean,k=12)
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

    svd_user_predicted_ratings = np.dot(np.dot(U,sigma),Vt) +user_ratings_mean.reshape(-1,1)
    df_svd_preds = pd.DataFrame(svd_user_predicted_ratings,columns = user_store_rating.columns)
    print(df_svd_preds)
    
   


    # 여기서부터  ~~~ 
    
    def recommend_stores(df_svd_preds, user_id, ori_stores_df,ori_ratings_df, num_recommendations=5):
        # 현재는 index로 적용 되어있는거라 -1 해줘야함
        user_row_number = user_id-1
        
        # 최종적으로 만든 df_svd_preds 에서 사용자 index에 따라 스토어 데이터 정렬 
        sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(ascending=False)
        
        # 원본 평점 데이터에서 user id 에 해당하는 데이터를 뽑아낸다
        user_data = ori_ratings_df[ori_ratings_df.user==user_id]
        print(user_data)
        # 위에서 뽑은 user_data와 원본 스토어 데이터를 합친다. 
        if not user_data.empty:
            user_history = user_data.merge(ori_stores_df, on='store_name').sort_values(['score'],ascending=False)
            #원본 스토어 데이터에서 사용자가 평점 남긴 스토어를 제외한 데이터를 추출
            recommendations = ori_stores_df[~ori_stores_df['store_name'].isin(user_history['store_name'])]
            
            # 사용자의 스토어 평점이 높은 순으로 정렬된 데이터와 위 추천 합친다

            recommendations = recommendations.merge(pd.DataFrame(sorted_user_predictions).reset_index(), on='store_name')
            
            # 컬럼 이름 바꾸고 정렬해서 return
            recommendations = recommendations.rename(columns = {user_row_number: 'Predictions'}).sort_values('Predictions')
        else:
            recommendations = ori_stores_df
            # 사용자의 스토어 평점이 높은 순으로 정렬된 데이터와 위 추천 합친다

            recommendations = recommendations.merge(pd.DataFrame(sorted_user_predictions).reset_index(), on='store_name')
            
            # 컬럼 이름 바꾸고 정렬해서 return
            recommendations = recommendations.rename(columns = {user_row_number: 'Predictions'}).sort_values('Predictions')

        return recommendations

    result = recommend_stores(df_svd_preds,10,final_df,final_df,50)
    result.drop_duplicates(['store_name'])
    print(result.drop_duplicates(['store_name']).head(10))
        



def main():
    data = load_dataframes()

    stores_most_scored = sort_stores_by_score(data)


if __name__ == "__main__":
    main()
