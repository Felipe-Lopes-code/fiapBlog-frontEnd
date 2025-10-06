import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`;

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', author: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await postService.getPostById(id);
      setPost(data);
    } catch (error) {
      setError('Erro ao carregar post. Por favor, tente novamente.');
      console.error('Erro ao carregar post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await postService.updatePost(id, post);
      navigate(`/post/${id}`);
    } catch (error) {
      setError('Erro ao atualizar post. Por favor, tente novamente.');
      console.error('Erro ao atualizar post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await postService.deletePost(id);
        navigate('/');
      } catch (error) {
        setError('Erro ao excluir post. Por favor, tente novamente.');
        console.error('Erro ao excluir post:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <FormContainer>
      <h2>Editar Post</h2>
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
        <ButtonGroup>
          <Button 
            type="button" 
            variant="danger"
            onClick={handleDelete}
          >
            Excluir
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default EditPostPage;