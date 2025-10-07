# 📋 Pull Request

## 📖 Descrição
<!-- Descreva suas mudanças em detalhes -->

## 🎯 Tipo de Mudança
- [ ] 🐛 Bug fix (mudança que corrige um problema)
- [ ] ✨ Nova funcionalidade (mudança que adiciona funcionalidade)
- [ ] 💥 Breaking change (correção ou funcionalidade que quebra compatibilidade)
- [ ] 📝 Documentação (mudanças apenas na documentação)
- [ ] 🎨 Estilo (formatação, ponto e vírgula, etc; sem mudança de código)
- [ ] ♻️ Refatoração (mudança de código que não corrige bug nem adiciona funcionalidade)
- [ ] ⚡ Performance (mudança que melhora performance)
- [ ] 🧪 Testes (adição ou correção de testes)
- [ ] 🔧 Chores (mudanças no processo de build, ferramentas auxiliares, etc)

## 🔗 Issue Relacionada
<!-- Esta PR corrige/implementa alguma issue? -->
Fixes #(issue)

## 🧪 Como Testar
<!-- Descreva os testes que você executou para verificar suas mudanças -->
1. Instale as dependências com `npm install`
2. Execute `npm run dev`
3. Navegue para [página específica]
4. Teste [funcionalidade específica]

## 📷 Screenshots/GIFs
<!-- Se suas mudanças afetam a UI, adicione screenshots ou GIFs -->

| Antes | Depois |
|-------|--------|
| [screenshot/gif] | [screenshot/gif] |

## ✅ Checklist de Revisão
### 🔍 Código
- [ ] Meu código segue as diretrizes de estilo do projeto
- [ ] Fiz uma auto-revisão do meu código
- [ ] Comentei áreas complexas do código
- [ ] Minhas mudanças não geram novos warnings
- [ ] Removi código comentado/debug

### 🧪 Testes
- [ ] Adicionei testes que provam que minha correção é efetiva ou que minha funcionalidade funciona
- [ ] Testes unitários novos e existentes passam localmente
- [ ] Verifiquei que não quebrei testes existentes
- [ ] Cobertura de testes foi mantida ou melhorada

### 📝 Documentação
- [ ] Fiz mudanças correspondentes na documentação
- [ ] Atualizei comentários de código quando necessário
- [ ] Adicionei exemplos de uso se aplicável

### 🔄 CI/CD
- [ ] Lint passou sem erros
- [ ] Build passou sem erros
- [ ] Todos os testes automatizados passaram

## 📊 Métricas de Impacto
### Performance
- [ ] Tempo de build: Sem impacto / Melhorou / Piorou
- [ ] Tamanho do bundle: Sem impacto / Reduziu / Aumentou
- [ ] Tempo de carregamento: Sem impacto / Melhorou / Piorou

### Cobertura de Testes
- **Antes:** X%
- **Depois:** Y%
- **Diff:** (+/-)Z%

## 🚀 Deploy e Rollback
- [ ] Esta mudança é compatível com versões anteriores
- [ ] Plano de rollback definido se necessário
- [ ] Configurações de ambiente atualizadas (se aplicável)
- [ ] Migrations de dados necessárias (se aplicável)

## 🔒 Considerações de Segurança
- [ ] Não expus informações sensíveis
- [ ] Validei todos os inputs do usuário
- [ ] Implementei controles de autorização adequados
- [ ] Não introduzi vulnerabilidades conhecidas

## 📝 Notas para Revisores
<!-- Qualquer informação adicional que ajude os revisores -->

### 🎯 Focar Em
- [ ] Lógica de negócio em [arquivo/função]
- [ ] Performance de [componente/função]
- [ ] Segurança em [área específica]
- [ ] Usabilidade de [funcionalidade]

### ⚠️ Pontos de Atenção
<!-- Destaque áreas que precisam de atenção especial -->

## 📋 Definition of Done
- [ ] Funcionalidade implementada conforme especificação
- [ ] Code review aprovado
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Deploy em ambiente de teste realizado
- [ ] Aprovação do Product Owner (se necessário)

---

### 🏷️ Labels Sugeridas
<!-- Remova as que não se aplicam -->
`bug` `enhancement` `documentation` `testing` `refactor` `performance` `security` `breaking-change` `needs-review` `ready-to-merge`