import React, { useEffect, useState } from "react";
import {
  ConfigProvider,
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Card,
  Space,
  Avatar,
  Grid,
} from "antd";
import {
  EnvironmentOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
  StarFilled,
} from "@ant-design/icons";

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const colors = {
  primary: "#8c5e4e",
  lightBg: "#fdf6f2",
  sectionBg: "#f5ebe0",
  cardBg: "#ffffff",
};
const boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";

export default function LandingPage() {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const whatsappLink = "https://wa.me/5516996489248";
  const instaProfile = "https://www.instagram.com/dra.noemynogueira/";

  const posts = [
    "https://www.instagram.com/p/DKId83eJwyp/",
    "https://www.instagram.com/p/DKSsLQDsMNm/",
  ];
  const [thumbs, setThumbs] = useState({});

  useEffect(() => {
    posts.forEach(async (url) => {
      if (/instagram\.com\/p\//.test(url)) {
        try {
          const res = await fetch(
            `https://api.instagram.com/oembed?url=${encodeURIComponent(
              url
            )}&omitscript=true`
          );
          const json = await res.json();
          if (json.thumbnail_url) {
            setThumbs((prev) => ({ ...prev, [url]: json.thumbnail_url }));
          }
        } catch {
          // ignore
        }
      }
    });
  }, []);

  const fallbackThumb = (url) => {
    const code = url.match(/\/p\/([^\/]+)/)?.[1];
    return code ? `https://www.instagram.com/p/${code}/media/?size=l` : "";
  };

  const address =
    "Condomínio Comercial Santa Maria, Edifício Santa Maria - R. Paulo César Pachêco, 470 - São José, Franca - SP, 14401-283";
  const mapsLink = "https://maps.app.goo.gl/yE8218aKisto3DjG6";
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  const isDirectImage = (url) => /\.(jpe?g|png|gif)(\?.*)?$/.test(url);

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: colors.primary, borderRadius: 8 } }}
    >
      <Layout style={{ background: colors.lightBg }}>
        <Content>
          {/* HERO */}
          <section
            style={{
              background: colors.sectionBg,
              padding: "100px 20px",
              textAlign: "center",
            }}
          >
            <Title
              level={2}
              style={{ color: colors.primary, marginBottom: 16 }}
            >
              Seja bem-vinda ao cuidado íntimo e natural
            </Title>
            <Paragraph
              style={{
                maxWidth: 600,
                margin: "0 auto 32px",
                fontSize: 16,
                lineHeight: 1.6,
              }}
            >
              Sou Noemy Nogueira, enfermeira especializada em Saúde da Mulher e
              Ginecologia Natural. Aqui, você encontra acolhimento, escuta ativa
              e orientações personalizadas para viver seu ciclo menstrual de
              forma plena.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              icon={<WhatsAppOutlined />}
              href={whatsappLink}
              target="_blank"
              block={isMobile}
              style={{
                maxWidth: 360,
                width: isMobile ? "100%" : "auto",
                padding: "0 40px",
              }}
            >
              Agende sua consulta humanizada
            </Button>
          </section>

          {/* INSTAGRAM */}
          <section
            style={{ background: colors.sectionBg, padding: "60px 20px" }}
          >
            <Title
              level={3}
              style={{
                textAlign: "center",
                color: colors.primary,
                marginBottom: 16,
              }}
            >
              Acompanhe minhas dicas no Instagram
            </Title>
            <Paragraph
              style={{
                textAlign: "center",
                margin: "0 auto 32px",
                maxWidth: 600,
              }}
            >
              Dicas práticas, orientações naturais e muito mais, direto no meu
              perfil.
            </Paragraph>
            <Row gutter={[16, 16]} justify="center">
              {posts.map((url) => {
                const src = isDirectImage(url)
                  ? url
                  : thumbs[url] || fallbackThumb(url);
                return (
                  <Col key={url} xs={24} sm={12} md={8}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "100%",
                        overflow: "hidden",
                        borderRadius: 8,
                        boxShadow,
                      }}
                    >
                      <img
                        src={src}
                        alt="Instagram post"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row justify="center" style={{ marginTop: 24 }}>
              <Button
                type="text"
                href={instaProfile}
                target="_blank"
                icon={<InstagramOutlined style={{ fontSize: 20 }} />}
                style={{ color: colors.primary, fontSize: 16, fontWeight: 500 }}
              >
                @dra.noemynogueira
              </Button>
            </Row>
          </section>

          {/* DEPOIMENTOS */}
          <section style={{ padding: "80px 20px" }}>
            <Title
              level={3}
              style={{
                textAlign: "center",
                color: colors.primary,
                marginBottom: 24,
              }}
            >
              Depoimentos inspiradores
            </Title>
            <Row gutter={[24, 24]} justify="center">
              {[
                {
                  name: "Maria S.",
                  quote: "Entendi meu ciclo e me sinto mais confiante!",
                  rating: 5,
                },
                {
                  name: "Ana P.",
                  quote: "Atendimento acolhedor e super profissional.",
                  rating: 5,
                },
              ].map(({ name, quote, rating }) => (
                <Col key={name} xs={24} sm={12} md={8}>
                  <Card
                    bordered={false}
                    style={{ boxShadow, borderRadius: 8, minHeight: 180 }}
                  >
                    <Space direction="vertical">
                      <Text italic>"{quote}"</Text>
                      <Space>
                        {[...Array(rating)].map((_, i) => (
                          <StarFilled
                            key={i}
                            style={{ color: colors.primary }}
                          />
                        ))}
                      </Space>
                      <Text strong>- {name}</Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* SERVIÇOS */}
          <section style={{ padding: "60px 20px" }}>
            <Title
              level={3}
              style={{
                textAlign: "center",
                color: colors.primary,
                marginBottom: 24,
              }}
            >
              Serviços oferecidos
            </Title>
            <Paragraph
              style={{
                textAlign: "center",
                maxWidth: 600,
                margin: "0 auto 32px",
              }}
            >
              Sessões personalizadas para entender seu corpo, equilibrar
              hormônios e viver seu ciclo com mais qualidade de vida.
            </Paragraph>
            <Row gutter={[16, 16]} justify="center">
              {[
                {
                  title: "Ginecologia Natural",
                  desc: "Fitoterapia e métodos naturais para equilíbrio hormonal.",
                },
                {
                  title: "Planejamento Familiar",
                  desc: "Métodos seguros sem hormônio para engravidar ou espaçar gestações.",
                },
                {
                  title: "Cuidados Íntimos",
                  desc: "Orientações e prevenção para conforto e saúde íntima.",
                },
              ].map((item) => (
                <Col key={item.title} xs={24} sm={12} md={8}>
                  <Card
                    title={item.title}
                    hoverable
                    style={{
                      borderRadius: 8,
                      boxShadow,
                      background: colors.cardBg,
                    }}
                  >
                    <Text>{item.desc}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* LOCALIZAÇÃO */}
          <section
            style={{ background: colors.sectionBg, padding: "60px 20px" }}
          >
            <Title level={3} style={{ textAlign: "center", marginBottom: 16 }}>
              Localização
            </Title>
            <Paragraph style={{ textAlign: "center", marginBottom: 24 }}>
              {address}
            </Paragraph>
            <Row justify="center">
              <Button
                icon={<EnvironmentOutlined />}
                href={mapsLink}
                target="_blank"
              >
                Ver no Google Maps
              </Button>
            </Row>
            <div style={{ marginTop: 24, borderRadius: 8, overflow: "hidden" }}>
              <iframe
                title="Localização"
                src={mapsEmbed}
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: colors.sectionBg,
            padding: "24px",
          }}
        >
          <Text>
            © {new Date().getFullYear()} Dra. Noemy Nogueira - Todos os direitos
            reservados.
          </Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
