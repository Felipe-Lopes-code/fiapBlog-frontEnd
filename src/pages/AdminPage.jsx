import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postService } from '../api/api';
import { Card, Button } from '../components/common/StyledComponents';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PostCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const PostMeta = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await postService.deletePost(id);
        await fetchPosts();
      } catch (error) {
        console.error('Erro ao excluir post:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AdminContainer>
      <h2>Gerenciar Posts</h2>
      <Button 
        variant="primary" 
        onClick={() => navigate('/create')}
        style={{ marginBottom: '1rem' }}
      >
        Criar Novo Post
      </Button>

      {posts.map(post => (
        <PostCard key={post.id}>
          <PostInfo>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>Por {post.author}</PostMeta>
          </PostInfo>
          <ButtonGroup>
            <Button
              variant="primary"
              onClick={() => navigate(`/edit/${post.id}`)}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(post.id)}
            >
              Excluir
            </Button>
          </ButtonGroup>
        </PostCard>
      ))}
    </AdminContainer>
  );
};

export default AdminPage;