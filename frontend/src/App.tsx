import RepresentanteForm from './components/RepresentanteForm';
import { Layout, Typography, Button, Divider, List } from 'antd';
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function App() {
  const features = [
    'Negocie valores diretamente com operadoras de sa\u00fade',
    'Envie documenta\u00e7\u00e3o e acompanhe o credenciamento on-line',
    'Acesso gratuito \u00e0 agenda e ao prontu\u00e1rio eletr\u00f4nico',
  ];
  return (
    <Layout>
      <Header className="bg-blue-600 text-white text-xl flex items-center justify-center">MedHub Credenciamento</Header>
      <Content>
        <section className="text-center py-10 bg-gray-50">
          <Title>Conecte sua cl\u00ednica \u00e0s operadoras</Title>
          <Paragraph className="max-w-2xl mx-auto">
            Facilite o processo de credenciamento e conquiste novas parcerias. Cadastre sua cl\u00ednica no MedHub e negocie com diversas operadoras de sa\u00fade em um s\u00f3 lugar.
          </Paragraph>
          <Button type="primary" href="#cadastro">Quero me cadastrar</Button>
        </section>
        <section className="max-w-3xl mx-auto p-6">
          <Title level={2} className="text-center mb-6">Vantagens para a sua cl\u00ednica</Title>
          <List dataSource={features} renderItem={(item) => <List.Item>{item}</List.Item>} />
        </section>
        <Divider />
        <section id="cadastro" className="max-w-xl mx-auto p-6">
          <Title level={2}>Cadastro do Representante</Title>
          <RepresentanteForm />
        </section>
      </Content>
      <Footer className="text-center">© {new Date().getFullYear()} MedHub</Footer>
    </Layout>
  );
}
