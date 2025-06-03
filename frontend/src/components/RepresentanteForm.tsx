import { Form, Input, Button } from 'antd';

export default function RepresentanteForm() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Dados', values);
    // TODO: enviar dados para API
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Nome completo" name="nome" rules={[{ required: true, message: 'Informe o nome completo' }]}> 
        <Input />
      </Form.Item>
      <Form.Item label="E-mail" name="email" rules={[{ type: 'email', required: true, message: 'E-mail inválido' }]}> 
        <Input placeholder="exemplo@clinica.com.br" />
      </Form.Item>
      <Form.Item label="Telefone/WhatsApp" name="telefone" rules={[{ required: true, message: 'Informe um telefone válido', pattern: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/ }]}> 
        <Input placeholder="(11) 99999-0000" />
      </Form.Item>
      <Form.Item label="CPF" name="cpf" rules={[{ required: true, message: 'Informe o CPF' }, { pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: 'Use o formato 000.000.000-00' }]}> 
        <Input placeholder="000.000.000-00" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Enviar</Button>
      </Form.Item>
    </Form>
  );
}
