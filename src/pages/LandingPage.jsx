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
  Grid,
} from "antd";
import {
  EnvironmentOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
  StarFilled,
} from "@ant-design/icons";
import heroImage from "../assets/imagem.jpg";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

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

// Container style for max-width content
const containerStyle = { width: "100%", maxWidth: 1200, margin: "0 auto" };

// URLs das fotos do consultório no Google Maps
const placePhotos = [img1, img2, img3, img4];

const ANIMATION_DURATION = "10s";
const CARD_WIDTH = 480;
const CARD_MARGIN = 16;

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
        } catch {}
      }
    });
  }, []);

  const fallbackThumb = (url) => {
    const code = url.match(/\/p\/([^\/])/)?.[1];
    return code ? `https://www.instagram.com/p/${code}/media/?size=l` : "";
  };

  const address =
    "R. Paulo César Pachêco, 470 - 6º Andar, Sala 614 - São José, Franca - SP, 14401-283";
  const mapsLink =
    "https://www.google.com/maps/place/Dr%C2%AANoemyNogueira-Consult%C3%B3riodeEnfermagemnaSa%C3%BAdedaMulher/@-20.5367097,-47.3881682,17z";
  const mapsEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.255859719858!2d-47.38816819999999!3d-20.5367097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a7170f5a1153%3A0xcdf72fa3f93a7824!2sDr%C2%AA%20Noemy%20Nogueira%20-%20Consult%C3%B3rio%20de%20Enfermagem%20na%20Sa%C3%BAde%20da%20Mulher!5e0!3m2!1spt-BR!2sbr!4v1749943103641!5m2!1spt-BR!2sbr";

  const isDirectImage = (url) => /\.(jpe?g|png|gif)(\?.*)?$/.test(url);
  const testimonials = [
    {
      name: "Maria Fernanda",
      quote:
        "Experiência incrível minha consulta com a doutora Noemy! Pela primeira vez me senti verdadeiramente acolhida em uma consulta ginecológica, ela me ouviu e me auxiliou da melhor forma possível, eu amei ❣️",
      rating: 5,
    },
    {
      name: "Fabiola Ferreira",
      quote:
        "Amei passar por consulta com  vc ,muito atenciosa,tirou todas minhas dúvidas e realizou o exame preventivo de uma forma bem descontraída simplesmente super índico",
      rating: 5,
    },
    {
      name: "Critiane Gustavo",
      quote:
        "Experiência maravilhosa em passar por consulta com essa excelente profissional.Atendimento e procedimentos de forma humanizada e a paciente em ouvir. Isso faz toda a diferença.Parabéns!!!!!Super indico.",
      rating: 5,
    },
    {
      name: "Stephany Ferrari",
      quote:
        "Ótimo consultório, profissional super atenciosa,melhor atendimento ❤️",
      rating: 5,
    },
    {
      name: "Laura",
      quote: "Eu amei demais , super atenciosa , educada e gentil ❤️",
      rating: 5,
    },
  ];

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
              padding: isMobile ? "0 20px" : "40px 20px",
            }}
          >
            {isMobile ? (
              <>
                {/* Full-bleed image on mobile */}
                <div
                  style={{
                    position: "relative",
                    width: "calc(100%  40px)",
                    margin: "0 -20px",
                    height: 320,
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow,
                  }}
                >
                  <img
                    src={heroImage}
                    alt="Noemy Nogueira"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      padding: 24,
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.6))",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    <Title
                      level={3}
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        marginBottom: 8,
                      }}
                    >
                      Seja bem-vinda ao cuidado íntimo e natural
                    </Title>
                    <Paragraph
                      style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        marginBottom: 24,
                      }}
                    >
                      Sou Noemy Nogueira, enfermeira ginecológica especialista
                      em Saúde da Mulher, com foco em atendimento humanizado.
                      Aqui você encontra consultas ginecológicas com qualidade e
                      escuta qualificada, sem pressa e com muito conforto.
                    </Paragraph>
                    <Button
                      type="primary"
                      icon={<WhatsAppOutlined />}
                      href={whatsappLink}
                      target="_blank"
                    >
                      Agendar agora
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div style={containerStyle}>
                <Row gutter={32} align="middle" wrap={false}>
                  <Col flex="0 0 40%">
                    <img
                      src={heroImage}
                      alt="Noemy Nogueira"
                      style={{ width: "100%", borderRadius: 8, boxShadow }}
                    />
                  </Col>
                  <Col flex="1" style={{ paddingLeft: 24 }}>
                    <Title
                      level={2}
                      style={{ color: colors.primary, marginBottom: 16 }}
                    >
                      Seja bem-vinda ao cuidado íntimo e natural
                    </Title>
                    <Paragraph
                      style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        marginBottom: 24,
                      }}
                    >
                      Sou Noemy Nogueira, enfermeira ginecológica especialista
                      em Saúde da Mulher, com foco em atendimento humanizado.
                      Aqui você encontra consultas ginecológicas com qualidade e
                      escuta qualificada, sem pressa e com muito conforto.
                    </Paragraph>
                    <Button
                      type="primary"
                      size="large"
                      icon={<WhatsAppOutlined />}
                      href={whatsappLink}
                      target="_blank"
                      style={{ padding: "0 40px" }}
                    >
                      Agende sua consulta humanizada
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
          </section>

          {/* SERVIÇOS */}
          <section style={{ padding: "20px 20px" }}>
            <div style={containerStyle}>
              <Title
                level={3}
                style={{
                  color: colors.primary,
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                Serviços oferecidos
              </Title>
              <Row gutter={[16, 16]} justify="center">
                {[
                  {
                    title: "Papanicolau Humanizado",
                    desc: "Atendimento presencial com foco em conforto e acolhimento: conheça meu método para uma consulta ginecológica mais suave.",
                  },
                  {
                    title: "Consulta Pré-Nupcial",
                    desc: "Sessão online ou presencial para casais que se cuidam e se amam, fortalecendo o vínculo com orientações especializadas.",
                  },
                  {
                    title: "Consulta Contraceptiva",
                    desc: "Orientação online ou presencial para escolher seu método contraceptivo com segurança e confiança.",
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
            </div>
          </section>

          {/* INSTAGRAM */}
          <section style={{ padding: "20px 20px" }}>
            <div style={containerStyle}>
              <Title
                level={3}
                style={{
                  color: colors.primary,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                Acompanhe minhas dicas no Instagram
              </Title>
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
                  style={{ color: colors.primary, fontSize: 16 }}
                >
                  @dra.noemynogueira
                </Button>
              </Row>
            </div>
          </section>

          {/* DEPOIMENTOS */}
          <style>{`
  @keyframes scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`}</style>

          <section style={{ background: colors.sectionBg, padding: "20px 0" }}>
            <div style={containerStyle}>
              <Title
                level={3}
                style={{
                  color: colors.primary,
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                Depoimentos inspiradores
              </Title>

              <div
                style={{
                  overflow: "hidden",
                  height: 200, // altura fixa para caber o card
                }}
              >
                <div
                  style={{
                    display: "flex",
                    /* margem negativa para “puxar” o último espaço */
                    marginRight: -CARD_MARGIN,
                    /* animação mais rápida e linear */
                    animation: `scroll ${ANIMATION_DURATION} linear infinite`,
                  }}
                >
                  {[...testimonials, ...testimonials].map(
                    ({ name, quote, rating }, idx) => (
                      <Card
                        key={idx}
                        bordered={false}
                        style={{
                          boxShadow,
                          borderRadius: 8,
                          width: CARD_WIDTH,
                          marginRight: CARD_MARGIN,
                          flex: "0 0 auto",
                        }}
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
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* LOCALIZAÇÃO */}
          <section
            style={{ background: colors.sectionBg, padding: "20px 20px" }}
          >
            <div style={containerStyle}>
              <Title
                level={3}
                style={{ textAlign: "center", marginBottom: 16 }}
              >
                Localização
              </Title>
              <Paragraph style={{ textAlign: "center", marginBottom: 16 }}>
                {address}
              </Paragraph>
              <Row justify="center" style={{ marginBottom: 16 }}>
                <Button
                  icon={<EnvironmentOutlined />}
                  href={mapsLink}
                  target="_blank"
                >
                  Ver no Google Maps
                </Button>
              </Row>

              {/* Mapa incorporado */}
              <div
                style={{
                  marginBottom: 24,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <iframe
                  title="Localização"
                  src={mapsEmbed}
                  width="100%"
                  height={isMobile ? 250 : 450}
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Fotos do Consultório */}
              {/* Fotos do Consultório */}
              <Title
                level={4}
                style={{ textAlign: "center", margin: "0 0 16px" }}
              >
                Fotos do Consultório
              </Title>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 16,
                  justifyItems: "center",
                }}
              >
                {placePhotos.map((url, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "100%",
                      maxWidth: 300,
                      position: "relative",
                      paddingBottom: "75%", // proporção 4:3
                      overflow: "hidden",
                      borderRadius: 8,
                      boxShadow,
                    }}
                  >
                    <img
                      src={url}
                      alt={`Foto ${idx + 1}`}
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
                ))}
              </div>
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
