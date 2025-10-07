# Guia de Contribuição

Obrigado por considerar contribuir para o FiapBlog! 🎉

Este documento orienta você sobre como contribuir para o projeto de forma efetiva.

## 📋 Índice

- [🎯 Como Contribuir](#-como-contribuir)
- [🏗️ Configuração do Ambiente](#️-configuração-do-ambiente)
- [📝 Padrões de Código](#-padrões-de-código)
- [🧪 Testes](#-testes)
- [📩 Enviando Contribuições](#-enviando-contribuições)
- [🐛 Reportando Bugs](#-reportando-bugs)
- [💡 Solicitando Features](#-solicitando-features)
- [❓ Dúvidas](#-dúvidas)

## 🎯 Como Contribuir

Existem várias maneiras de contribuir:

### 🔧 Desenvolvimento
- Corrigir bugs reportados
- Implementar novas funcionalidades
- Melhorar performance
- Adicionar testes
- Melhorar documentação

### 📚 Documentação
- Corrigir erros de documentação
- Adicionar exemplos
- Traduzir conteúdo
- Melhorar README e guias

### 🧪 Qualidade
- Reportar bugs
- Sugerir melhorias
- Revisar Pull Requests
- Testar novas funcionalidades

## 🏗️ Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ e npm
- Git
- Docker (opcional, para desenvolvimento)

### Setup Local

1. **Fork e Clone**
```bash
# Fork o repositório no GitHub
# Clone o seu fork
git clone https://github.com/SEU-USERNAME/fiapBlog-frontEnd.git
cd fiapBlog-frontEnd

# Adicione o repositório original como upstream
git remote add upstream https://github.com/ORIGINAL-OWNER/fiapBlog-frontEnd.git
```

2. **Instale Dependências**
```bash
npm install
```

3. **Execute o Ambiente de Desenvolvimento**
```bash
# Desenvolvimento local
npm run dev

# Ou com Docker
docker-compose up -d
```

4. **Execute os Testes**
```bash
npm test
npm run test:coverage
```

### Estrutura do Projeto
```
src/
├── components/        # Componentes reutilizáveis
├── pages/            # Páginas da aplicação
├── hooks/            # Custom hooks
├── context/          # Context providers
├── api/             # Serviços de API
├── styles/          # Temas e estilos globais
└── test/            # Utilitários de teste
```

## 📝 Padrões de Código

### Estilo de Código

Seguimos as seguintes convenções:

#### JavaScript/React
```javascript
// ✅ Correto
const UserProfile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = useCallback(() => {
    onUpdate(user);
    setIsEditing(false);
  }, [user, onUpdate]);
  
  return (
    <UserCard>
      {isEditing ? (
        <EditForm onSave={handleSave} />
      ) : (
        <UserInfo user={user} />
      )}
    </UserCard>
  );
};

// ❌ Evitar
function userProfile(props) {
  var editing = false;
  
  return <div>{props.user.name}</div>;
}
```

#### Styled Components
```javascript
// ✅ Correto
const StyledButton = styled.button`
  background-color: ${({ theme, variant }) => 
    theme.colors[variant] || theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  &:hover {
    opacity: 0.8;
  }
  
  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

// ❌ Evitar
const Button = styled.button`
  background: blue;
  padding: 10px;
`;
```

### Naming Conventions

- **Componentes**: PascalCase (`UserProfile`, `PostCard`)
- **Hooks**: camelCase com prefixo `use` (`useAuth`, `usePostsData`)
- **Variáveis**: camelCase (`isLoading`, `userData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`, `DEFAULT_TIMEOUT`)
- **Arquivos**: camelCase para utilities, PascalCase para componentes

### Estrutura de Componentes

```javascript
// ComponentName.jsx
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { StyledComponent } from './ComponentName.styles';

const ComponentName = ({ prop1, prop2, onAction }) => {
  // 1. State
  const [localState, setLocalState] = useState();
  
  // 2. Custom hooks
  const { data, loading } = useCustomHook();
  
  // 3. Handlers
  const handleClick = useCallback(() => {
    onAction(localState);
  }, [localState, onAction]);
  
  // 4. Effects
  useEffect(() => {
    // side effects
  }, []);
  
  // 5. Early returns
  if (loading) return <LoadingSpinner />;
  
  // 6. Render
  return (
    <StyledComponent>
      {/* JSX content */}
    </StyledComponent>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onAction: PropTypes.func.isRequired,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

## 🧪 Testes

### Escrevendo Testes

Seguimos o padrão AAA (Arrange, Act, Assert):

```javascript
// UserProfile.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserProfile from '../UserProfile';
import { ThemeProviderWrapper } from '../../test/testUtils';

describe('UserProfile', () => {
  it('should render user information correctly', () => {
    // Arrange
    const mockUser = {
      id: 1,
      name: 'João Silva',
      email: 'joao@example.com'
    };
    const mockOnUpdate = vi.fn();
    
    // Act
    render(
      <ThemeProviderWrapper>
        <UserProfile user={mockUser} onUpdate={mockOnUpdate} />
      </ThemeProviderWrapper>
    );
    
    // Assert
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
  });
  
  it('should call onUpdate when save button is clicked', () => {
    // Arrange
    const mockUser = { id: 1, name: 'João' };
    const mockOnUpdate = vi.fn();
    
    render(
      <ThemeProviderWrapper>
        <UserProfile user={mockUser} onUpdate={mockOnUpdate} />
      </ThemeProviderWrapper>
    );
    
    // Act
    fireEvent.click(screen.getByText('Editar'));
    fireEvent.click(screen.getByText('Salvar'));
    
    // Assert
    expect(mockOnUpdate).toHaveBeenCalledWith(mockUser);
  });
});
```

### Tipos de Teste

1. **Unit Tests**: Teste componentes isoladamente
2. **Integration Tests**: Teste interação entre componentes
3. **E2E Tests**: Teste fluxos completos do usuário

### Cobertura de Testes

Mantemos pelo menos 70% de cobertura de código:

```bash
npm run test:coverage
```

## 📩 Enviando Contribuições

### Workflow de Contribuição

1. **Crie uma Branch**
```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

2. **Faça suas Alterações**
```bash
# Faça commits pequenos e descritivos
git add .
git commit -m "feat: adiciona funcionalidade X"
```

3. **Teste suas Alterações**
```bash
npm run lint
npm run test
npm run build
```

4. **Push e Pull Request**
```bash
git push origin feature/nova-funcionalidade
# Abra um Pull Request no GitHub
```

### Padrão de Commits

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição

[corpo opcional]

[footer opcional]
```

#### Tipos de Commit
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Tarefas de build, configuração, etc

#### Exemplos
```bash
feat(auth): adiciona login com Google
fix(posts): corrige bug na paginação
docs(readme): atualiza instruções de instalação
test(auth): adiciona testes para AuthContext
refactor(api): simplifica chamadas da API
style(components): formata código com Prettier
chore(deps): atualiza dependências
```

### Template de Pull Request

```markdown
## 📋 Descrição
Breve descrição do que foi alterado.

## 🎯 Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## ✅ Checklist
- [ ] Testes passando
- [ ] Lint passando
- [ ] Documentação atualizada
- [ ] Self-review realizado

## 🧪 Como Testar
1. Instale as dependências
2. Execute `npm run dev`
3. Teste a funcionalidade X

## 📸 Screenshots (se aplicável)
[Adicione screenshots das mudanças visuais]

## 📝 Notas Adicionais
Informações adicionais para os revisores.
```

## 🐛 Reportando Bugs

### Template de Bug Report

```markdown
**Descrição do Bug**
Descrição clara e concisa do bug.

**Para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role para baixo até '...'
4. Veja o erro

**Comportamento Esperado**
Descrição do que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [e.g. Windows 10]
 - Browser: [e.g. Chrome 91]
 - Node: [e.g. 18.0.0]

**Contexto Adicional**
Qualquer outra informação sobre o problema.
```

## 💡 Solicitando Features

### Template de Feature Request

```markdown
**A feature está relacionada a um problema?**
Descrição clara do problema.

**Descreva a solução desejada**
Descrição clara da funcionalidade desejada.

**Descreva alternativas consideradas**
Outras soluções ou funcionalidades consideradas.

**Contexto Adicional**
Screenshots, mockups, ou contexto adicional.
```

## 📊 Processo de Review

### Para Reviewers

- ✅ Código segue os padrões estabelecidos
- ✅ Testes estão incluídos e passando
- ✅ Documentação foi atualizada se necessário
- ✅ Não há breaking changes não documentadas
- ✅ Performance não foi degradada

### Para Contribuidores

- 📝 Seja receptivo ao feedback
- 🔄 Responda rapidamente aos comentários
- 🧪 Adicione testes para seu código
- 📚 Documente funcionalidades complexas
- 💬 Explique suas decisões de design

## 🏆 Reconhecimento

Contribuidores são reconhecidos de várias formas:

- 📝 Nome na lista de contribuidores
- 🌟 Menção especial em releases importantes
- 📧 Agradecimento direto da equipe
- 🎯 Convite para revisar outras PRs

## ❓ Dúvidas

### Onde Pedir Ajuda

- 🐛 **Bugs**: Abra uma issue
- 💡 **Ideias**: Discussions no GitHub
- ❓ **Dúvidas Gerais**: Discussion ou email
- 🚨 **Segurança**: Veja [SECURITY.md](SECURITY.md)

### Recursos Úteis

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Styled Components](https://styled-components.com/)
- [Material-UI](https://mui.com/)

---

## 📞 Contato

- **Email**: [inserir email da equipe]
- **GitHub Discussions**: [link para discussions]
- **Discord/Slack**: [se aplicável]

---

Obrigado por contribuir! 🚀

*Este documento está sempre evoluindo. Sugestões de melhoria são bem-vindas!*