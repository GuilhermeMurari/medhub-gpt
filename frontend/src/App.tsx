import { Layout } from 'antd';
import LandingPage from './components/LandingPage';
const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Header className="bg-blue-600 text-white text-xl">MedHub</Header>
      <Content>
        <LandingPage />
      </Content>
    </Layout>
  );
}
