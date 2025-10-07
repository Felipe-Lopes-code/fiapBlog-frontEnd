import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postService } from '../api/api';
import { Card, Input, Button } from '../components/common/StyledComponents';
import { useAuth } from '../context/AuthContext';

const SearchContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PostPreview = styled(Card)`
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease-in-out;
  }
`;

const PostTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const PostMeta = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log('Buscando posts...');
      const data = await postService.getAllPosts(searchTerm);
      console.log('Posts recebidos:', data);
      setPosts(data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div>
      <h1>Blog FIAP</h1>
      
      <SearchContainer>
        <Input
          type="text"
          placeholder="Buscar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Buscar
        </Button>
        {isAuthenticated && user?.role === 'PROFESSOR' && (
          <Button variant="primary" onClick={() => navigate('/create')}>
            Novo Post
          </Button>
        )}
      </SearchContainer>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <PostPreview key={post.id} onClick={() => handlePostClick(post.id)}>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>Por {post.author}</PostMeta>
            <p>{post.description || post.content.substring(0, 150)}...</p>
          </PostPreview>
        ))
      )}
    </div>
  );
};

export default HomePage;