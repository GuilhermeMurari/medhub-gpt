import { Form, Input, Button } from 'antd';

export default function RepresentanteForm() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Dados', values);
    // TODO: enviar dados para API
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Nome completo" name="nome" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item label="E-mail" name="email" rules={[{ type: 'email', required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item label="Telefone/WhatsApp" name="telefone" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item label="CPF" name="cpf" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Enviar</Button>
      </Form.Item>
    </Form>
  );
}
