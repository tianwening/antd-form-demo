import { Layout, Space, Card, Spin } from 'antd'
import { useMemo, Suspense } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import routes from './routes'

const { Header, Content } = Layout


function App() {

  const location = useLocation()
  const pathname = useMemo(() => location?.pathname, [location])

  return (
    <Layout>
      <Header>
        <Space>
          {routes.map(route => (
            <Link to={`/${route.path}`}>{route.path}</Link>
          ))}
        </Space>
      </Header>
      <Content>
        <Card
          title={pathname}
        >
          <Suspense fallback={<Spin />}>
            <Outlet />
          </Suspense>
        </Card>
      </Content>
    </Layout>
  );
}

export default App;
