import RepresentanteForm from './components/RepresentanteForm';
import { Layout, Typography } from 'antd';
const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Header className="bg-blue-600 text-white text-xl">MedHub Credenciamento</Header>
      <Content className="p-4 max-w-xl mx-auto">
        <Typography.Title level={2}>Cadastro do Representante</Typography.Title>
        <RepresentanteForm />
      </Content>
    </Layout>
  );
}
