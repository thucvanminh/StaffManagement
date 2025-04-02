'use client';
import '@ant-design/v5-patch-for-react-19';

import React from 'react';
import { Layout, Button, Row, Col, Typography, Card, Flex } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HomePage.module.css';
import Meta from 'antd/es/card/Meta';
import RecruitmentForm from '../components/RecruitForm';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Homepage: React.FC = () => {
    return (
        <Layout>
            {/* Header */}
            <Header className={styles.header}>
                <div className={styles.logo}>
                    <Link href="/homepage">
                        <Image src="/logo-th.png" alt="TH Logo" width={80} height={80} />
                    </Link>
                </div>
                <Link href="/login">
                    <Button type="primary" className={styles.loginButton}>
                        Login
                    </Button>
                </Link>
            </Header>

            {/* Body */}
            <Content className={styles.content}>
                <div className={styles.banner}>
                    <Image
                        src="/banner-image.jpg"
                        alt="Banner"
                        layout="responsive"
                        width={1200}
                        height={400}
                        style={{ objectFit: 'cover' }}
                    />
                    <Title className={styles.bannerText}>Where Talent Meets Opportunity</Title>
                </div>

                {/* About Section */}
                <div className={styles.aboutSection}>
                    <Card styles={{ body: { padding: 0, overflow: 'hidden' } }}>
                        <Row gutter={[0, 16]} align="stretch">
                            <Col xs={24} md={12} className={styles.imageCol}>
                                <Image
                                    src="/about-company.jpg"
                                    alt="about-company"
                                    layout="fill"
                                    style={{ objectFit: 'cover' }}
                                />
                            </Col>
                            <Col xs={24} md={12} className={styles.textCol}>
                                <Flex vertical align="center" style={{ padding: 30, textAlign: 'center', height: '100%' }}>
                                    <Title level={2}>About Company</Title>
                                    <Paragraph style={{ textAlign: 'justify', fontSize: '16px' }}>
                                        TH Company is a leading provider of human resource management solutions, specializing in recruitment, training, and talent development. Our mission is to help businesses optimize their workforce and achieve sustainable growth through innovative HRM strategies and technologies. We are a pioneering company in the field of human resource management, committed to delivering optimal HRM solutions to help businesses effectively manage their workforce. With cutting-edge technology and a team of experienced experts, our mission is to enhance work performance, streamline recruitment, training, and talent development processes, thereby supporting the sustainable growth of your business.
                                    </Paragraph>
                                </Flex>
                            </Col>
                        </Row>
                    </Card>
                </div>

                {/* Recruitment Section */}
                <div className={styles.recruitmentSection}>
                    <Card styles={{ body: { padding: 0, overflow: 'hidden' } }}>
                        <Row gutter={[0, 16]} align="stretch">
                            <Col xs={24} md={12} className={styles.imageCol}>
                                <Image
                                    src="/recruitment-sample.jpg"
                                    alt="recruitment"
                                    layout="fill"
                                    style={{ objectFit: 'cover' }}
                                />
                            </Col>
                            <Col xs={24} md={12} className={styles.textCol}>
                                <Flex vertical align="center" style={{ padding: 20, textAlign: 'center', height: '100%' }}>
                                    <Title level={2}>Apply For Recruitment</Title>
                                    <div className={styles.recruitmentForm}>
                                        <RecruitmentForm />
                                    </div>
                                </Flex>
                            </Col>
                        </Row>
                    </Card>
                </div>

                {/* News Section */}
                <div className={styles.newsSection}>
                    <Title level={2}>News</Title>
                    <Row gutter={[24, 16]} justify="center">
                        {[
                            {
                                title: 'Nvidia Expands Operations in Vietnam',
                                description: 'Nvidia announces a new research and development center in Vietnam, aiming to tap into the country’s growing tech talent pool.',
                            },
                            {
                                title: 'Tech Giant Unveils New AI Tool',
                                description: 'A leading tech company launches an innovative AI tool designed to boost productivity across industries.',
                            },
                            {
                                title: 'New HRM Software Hits the Market',
                                description: 'A cutting-edge human resource management platform promises to streamline corporate hiring and training.',
                            },
                            {
                                title: 'Global Markets Surge After Economic Report',
                                description: 'Stock markets worldwide rise sharply following a positive economic growth forecast released today.',
                            },
                            {
                                title: 'Breakthrough in Renewable Energy Research',
                                description: 'Scientists announce a new solar panel design that doubles energy efficiency at half the cost.',
                            },
                            {
                                title: 'Startup Secures $50M in Funding',
                                description: 'A promising tech startup receives major investment to expand its AI-driven healthcare solutions.',
                            },
                        ].map((news, index) => (
                            <Col xs={24} sm={12} md={8} lg={4} key={index}>
                                <Card
                                    hoverable
                                    className={styles.newsCard}
                                    cover={<img src="/news-sample.png" alt={news.title} />}
                                >
                                    <Meta title={news.title} description={news.description} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>

            {/* Footer */}
            <Footer className={styles.footer}>
                <Row gutter={[16, 16]} justify="center">
                    {/* Logo TH */}
                    <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
                        <Link href="/homepage">
                            <Image src="/logo-th.png" alt="TH Logo" width={180} height={180} />
                        </Link>
                    </Col>

                    {/* Social Media */}
                    <Col xs={24} sm={12} md={6}>
                        <Title level={4}>Social Media</Title>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
                            <li><a href="https://youtube.com" target="_blank">Youtube</a></li>
                            <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
                            <li><a href="https://tiktok.com" target="_blank">Tiktok</a></li>
                            <li><a href="https://zalo.me" target="_blank">Zalo</a></li>
                        </ul>
                    </Col>

                    {/* Contact Us */}
                    <Col xs={24} sm={12} md={6}>
                        <Title level={4}>Contact Us</Title>
                        <p>
                            Address: Đường Nam Kỳ Khởi Nghĩa, Định Hoà, Tp. Thủ Dầu Một, Bình Dương, Việt Nam
                            <br />
                            Email: contact@thcompany.com
                            <br />
                            Phone: +84 123 456 789
                            <br />
                            Office hours: Monday – Friday, from 7:30 to 16:30 (GMT+7)
                        </p>
                    </Col>

                    {/* Our Location */}
                    <Col xs={24} sm={12} md={6}>
                        <Title level={4}>Our Location</Title>
                        <div className={styles.mapContainer}>
                            <iframe
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=106.66453145767083%2C11.051002484221333%2C106.66853145767083%2C11.055002484221333&layer=mapnik&marker=11.053002484221333%2C106.66653145767083`}
                                width="100%"
                                height="200"
                                style={{ border: 'none' }}
                                title="OpenStreetMap"
                            />
                        </div>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
};

export default Homepage;