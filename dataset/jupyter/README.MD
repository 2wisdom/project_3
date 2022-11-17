## Plantnet-300k Dataset

<br>

1.  이 이미지 데이터 세트는 1,081종의 식물 이미지 306,146개로 구성되어 있고, train, val, test라는 이름을 가진 3개의 폴더와 그 하위에 1,081개의 서브폴더가 있습니다.

        ○ 이 데이터 세트는 클래스 불균형이 강합니다. 즉, 소수의 종이 대부분의 이미지를 차지합니다.
        ○ 많은 종이 시각적으로 유사하여 전문가의 눈으로도 식별하기 어렵습니다.
        ○ 위 두 가지 특성은 모델의 과적합을 발생시키고, 이미지 식별의 난이도가 높기 때문에 데이터 세트의 설정 값을 평가하기에 적합하다는 것을 의미합니다.

<br>

2.  각각의 서브폴더의 이름은 “plantnet300K species id 2 name.json” 파일 내의 클래스 이름과 동일합니다.

        예제: 서브폴더 이름 1355868, 파일 내의 클래스 이름 "1355868": "Lactuca virosa L."

<br>

3.  “plantnet300K metadata.json” 파일에는 각 이미지의 정보를 포함하고 있습니다.

        ○ species identifier (class)
        ○ the author’s name
        ○ the license
        ○ the split (i.e., train, validation or test set)
        ○ the organ of the plant (flower, leaf, bark, ...)

<br>

- PlantNet-300K 식물 이미지 dataset URL : https://doi.org/10.5281/zenodo.5645731

- 인공지능 모델과 코드를 확인 할 수 있는 github repository URL : https://github.com/plantnet/PlantNet-300K/

<br>
<br>

## Jupyter notebook

<br>

- p3-PlantNet-metadata.ipynb - 위 3번의 이미지 정보 포함 (75.5MB)
- p3-PlantNet-metadata-short-ver.ipynb - 작은 용량 버전 (68.6KB)
- p3-PlantNet-species id 2 name.ipynb - 식물종의 고유번호와 이름 (63.7KB)
