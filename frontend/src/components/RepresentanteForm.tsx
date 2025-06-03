import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import ClinicaForm from './ClinicaForm';

export default function RepresentanteForm() {
  const [form] = Form.useForm();
  const [etapa, setEtapa] = useState<'rep' | 'clinica'>('rep');
  const [email, setEmail] = useState('');

  const onFinish = async (values: any) => {
    await fetch('http://localhost:3000/representantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    setEmail(values.email);
    setEtapa('clinica');
  };

  if (etapa === 'clinica') return <ClinicaForm email={email} />;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Nome completo" name="nome" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item label="E-mail" name="email" rules={[{ type: 'email', required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item label="Telefone" name="telefone" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item label="WhatsApp" name="whatsapp" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item label="Senha" name="senha" rules={[{ required: true }]}> 
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Enviar</Button>
      </Form.Item>
    </Form>
  );
}
