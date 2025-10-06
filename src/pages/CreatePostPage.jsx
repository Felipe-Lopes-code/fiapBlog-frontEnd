import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postService } from '../api/api';
import { Card, Input, TextArea, Button } from '../components/common/StyledComponents';

const FormContainer = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const CreatePostPage = () => {
  const [post, setPost] = useState({ title: '', content: '', author: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await postService.createPost(post);
      navigate('/');
    } catch (error) {
      setError('Erro ao criar post. Por favor, tente novamente.');
      console.error('Erro ao criar post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer>
      <h2>Criar Novo Post</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Título"
          value={post.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="author"
          placeholder="Autor"
          value={post.author}
          onChange={handleChange}
          required
        />
        <TextArea
          name="content"
          placeholder="Conteúdo do post"
          value={post.content}
          onChange={handleChange}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button 
          type="submit" 
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Post'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreatePostPage;