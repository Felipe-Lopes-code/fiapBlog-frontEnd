import { useApi } from './useApi';
import { mockApi } from '../api/mockApi';

export const usePostsPresenter = () => {
  const getPostsApi = useApi(mockApi.getPosts);
  const getPostApi = useApi(mockApi.getPost);
  const createPostApi = useApi(mockApi.createPost);
  const updatePostApi = useApi(mockApi.updatePost);
  const deletePostApi = useApi(mockApi.deletePost);

  const createPost = async (postData) => {
    await createPostApi.request(postData);
    window.location.hash = '#/admin';
  };
  const updatePost = async (id, postData) => {
    await updatePostApi.request(id, postData);
    window.location.hash = '#/admin';
  };
  const deletePost = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      await deletePostApi.request(id);
      getPostsApi.request(); // Recarrega a lista
    }
  };

  return {
    posts: getPostsApi.data,
    post: getPostApi.data,
    loading: getPostsApi.loading || getPostApi.loading || createPostApi.loading || updatePostApi.loading || deletePostApi.loading,
    error: getPostsApi.error || getPostApi.error || createPostApi.error || updatePostApi.error || deletePostApi.error,
    fetchPosts: getPostsApi.request,
    fetchPost: getPostApi.request,
    createPost,
    updatePost,
    deletePost,
  };
};