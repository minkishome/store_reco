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

    #  여기서 부터 알고
    tmp1 = pd.read_csv('./name_img_price.csv')
    nip = pd.DataFrame(tmp1, columns=tmp1.keys())
    stores_reviews = pd.merge(stores_reviews, nip, on='store_name')
    print(stores_reviews)
    final_df = stores_reviews[['store_id', 'store_name',
                               'user', 'score', 'store_image', 'price', ]]  # 수경
    user_store_rating = final_df.pivot_table(
        'score', index='user', columns='store_name').fillna(0)
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

    # 여기서부터  ~~~

    def recommend_stores(df_svd_preds, user_id, ori_stores_df, ori_ratings_df, num_recommendations=5):
        # 현재는 index로 적용 되어있는거라 -1 해줘야함
        user_row_number = user_id-1

        # 최종적으로 만든 df_svd_preds 에서 사용자 index에 따라 스토어 데이터 정렬
        sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(
            ascending=False)

        # 원본 평점 데이터에서 user id 에 해당하는 데이터를 뽑아낸다
        user_data = ori_ratings_df[ori_ratings_df.user == user_id]
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
    print(result.drop_duplicates(['store_name']).head(10))


def main():
    data = load_dataframes()

    stores_most_scored = sort_stores_by_score(data)


if __name__ == "__main__":
    main()
