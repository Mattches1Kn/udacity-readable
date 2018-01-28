import * as Api from "../util/Api";

export const CATEGORY_LIST_IS_LOADING = 'CATEGORY_LIST_IS_LOADING';
export const CATEGORY_LIST_LOADING_SUCCESS = 'CATEGORY_LIST_LOADING_SUCCESS';
export const CATEGORY_LIST_LOADING_ERROR = 'CATEGORY_LIST_LOADING_ERROR';

export function loadingError(bool) {
    return {
        type: CATEGORY_LIST_LOADING_ERROR,
        loadingError: bool
    };
}

export function isLoading(bool) {
    return {
        type: CATEGORY_LIST_IS_LOADING,
        isLoading: bool
    };
}

export function loadingSuccess(items) {
    return {
        type: CATEGORY_LIST_LOADING_SUCCESS,
        items:items.categories
    };
}

export function loadCategoryList() {
    return (dispatch) => {
        dispatch(isLoading(true));

        Api.getCategoryList()
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(isLoading(false));

                return response;
            })
            .then(res => res.json())
            .then((items) => dispatch(loadingSuccess(items)))
            .catch(() => dispatch(loadingError(true)));
    };
}
