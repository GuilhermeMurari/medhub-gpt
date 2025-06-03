import { Typography, Button } from 'antd';
import RepresentanteForm from './RepresentanteForm';

export default function LandingPage() {
  return (
    <div className="text-center">
      <section className="bg-gradient-to-r from-blue-500 to-teal-400 py-20 text-white space-y-6">
        <Typography.Title className="!text-white" level={1}>Credencie sua clínica no MedHub</Typography.Title>
        <p className="max-w-2xl mx-auto text-lg">Alcance mais pacientes e simplifique a gestão da sua clínica através da nossa plataforma.</p>
        <Button type="primary" size="large" href="#cadastro">Cadastre-se agora</Button>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-left">
          <div>
            <Typography.Title level={4}>Maior alcance</Typography.Title>
            <p>Conecte-se a pacientes de todo o país e aumente sua visibilidade.</p>
          </div>
          <div>
            <Typography.Title level={4}>Processos digitais</Typography.Title>
            <p>Reduza a burocracia com nosso credenciamento totalmente online.</p>
          </div>
          <div>
            <Typography.Title level={4}>Suporte especializado</Typography.Title>
            <p>Conte com uma equipe pronta para ajudar sempre que precisar.</p>
          </div>
        </div>
      </section>

      <section id="cadastro" className="py-16 max-w-xl mx-auto">
        <Typography.Title level={2}>Cadastre sua clínica</Typography.Title>
        <RepresentanteForm />
      </section>
    </div>
  );
}
