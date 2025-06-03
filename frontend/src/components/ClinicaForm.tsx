import { Form, Input, Button, Typography } from 'antd';

export default function ClinicaForm({ email }: { email: string }) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Dados clínica', values);
    // TODO: enviar dados para API
  };

  return (
    <div>
      <Typography.Paragraph>
        Um código de verificação foi enviado para <strong>{email}</strong>.
      </Typography.Paragraph>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Nome da clínica" name="nome" rules={[{ required: true }]}> 
          <Input />
        </Form.Item>
        <Form.Item label="CNPJ" name="cnpj" rules={[{ required: true }]}> 
          <Input />
        </Form.Item>
        <Form.Item label="Código de verificação" name="codigo" rules={[{ required: true }]}> 
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Salvar</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
