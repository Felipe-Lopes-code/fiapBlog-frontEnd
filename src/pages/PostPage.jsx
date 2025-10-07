import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postService } from '../api/api';
import { Card, Button, TextArea } from '../components/common/StyledComponents';
import { useAuth } from '../context/AuthContext';

const PostContainer = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const PostTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PostMeta = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PostContent = styled.div`
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CommentsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const CommentForm = styled.form`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await postService.getPostById(id);
      setPost(data);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.addComment(id, { content: comment });
      setComment('');
      await fetchPost(); // Recarrega o post para mostrar o novo comentário
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!post) {
    return <div>Post não encontrado</div>;
  }

  return (
    <div>
      <PostContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>Por {post.author}</PostMeta>
        <PostContent>{post.content}</PostContent>
        
        {isAuthenticated && user?.role === 'PROFESSOR' && (
          <Button 
            variant="primary" 
            onClick={() => navigate(`/edit/${post.id}`)}
          >
            Editar Post
          </Button>
        )}
      </PostContainer>

      <CommentsSection>
        <h3>Comentários</h3>
        {post.comments?.map((comment, index) => (
          <Card key={index}>
            <p>{comment.content}</p>
            <PostMeta>Por {comment.author}</PostMeta>
            {isAuthenticated && user?.role === 'PROFESSOR' && (
              <Button 
                variant="danger" 
                onClick={async () => {
                  try {
                    await postService.deleteComment(id, index);
                    await fetchPost();
                  } catch (error) {
                    console.error('Erro ao excluir comentário:', error);
                  }
                }}
              >
                Excluir Comentário
              </Button>
            )}
          </Card>
        ))}

        <CommentForm onSubmit={handleCommentSubmit}>
          <TextArea
            placeholder="Adicione um comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <Button type="submit" variant="primary">
            Enviar Comentário
          </Button>
        </CommentForm>
      </CommentsSection>
    </div>
  );
};

export default PostPage;