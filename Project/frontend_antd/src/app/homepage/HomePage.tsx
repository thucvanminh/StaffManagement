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
            <Content style={{ padding: '0 50px', marginTop: '20px' }}>
                <div className={styles.banner}>
                    <Image
                        src="/banner-image.jpg"
                        alt="Banner"
                        width={1200}
                        height={400}
                        style={{ objectFit: 'cover', width: '100%', height: '400px' }}
                    />
                    <Title className={styles.bannerText}>Where Talent Meets Opportunity</Title>
                </div>

                {/* Div 2: Thông tin sơ bộ công ty */}
                <div className={styles.aboutSection}>
                    <Card styles={{ body: { padding: 0, overflow: 'hidden' } }}>
                        <Flex justify="space-between">
                            <img
                                alt="about-company"
                                src="/about-company.jpg"
                                width={700}
                                height={400}
                                style={{ objectFit: 'cover' }}
                            />
                            <Flex vertical align="flex-center" style={{ padding: 30, textAlign: 'center' }}>
                                <p className='Title' style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                    About Company
                                </p>
                                <p className='Paragraph' style={{ textAlign: 'justify', fontSize: '16px' }}>
                                    TH Company is a leading provider of human resource management solutions, specializing in recruitment, training, and talent development. Our mission is to help businesses optimize their workforce and achieve sustainable growth through innovative HRM strategies and technologies.
                                    We are a pioneering company in the field of human resource management, committed to delivering optimal HRM solutions to help businesses effectively manage their workforce. With cutting-edge technology and a team of experienced experts, our mission is to enhance work performance, streamline recruitment, training, and talent development processes, thereby supporting the sustainable growth of your business.
                                </p>
                            </Flex>
                        </Flex>
                    </Card>

                </div>
                {/* Div 3: Thông tin sơ bộ công ty */}
                <div className={styles.recruitmentSection}>
                    <Card styles={{ body: { padding: 0, overflow: 'hidden' } }}>
                        <Flex justify="gap" gap="70px"> {/* Changed from space-between to center, added gap */}
                            <img
                                alt="recruitment"
                                src="/recruitment-sample.jpg"
                                width={600}
                                height={600}
                                style={{ objectFit: 'cover' }}
                            />
                            <Flex vertical align="flex-center" style={{ padding: 20, textAlign: 'center' }}> 
                                <p className="Title" style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                    Apply For Recruitment
                                </p>
                                <div className="RecruitmentForm" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                                    <RecruitmentForm />
                                </div>
                            </Flex>
                        </Flex>
                    </Card>
                </div>
                {/* Div 4: Tin tức */}
                <div className={styles.newsSection}>
                    <Title level={2}>News</Title>
                    <Row gutter={[24, 16]}>
                        <Col span={4}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img src="/news-sample.png" />}
                            >
                                <Meta title="Nvidia Expands Operations in Vietnam" description="Nvidia announces a new research and development center in Vietnam, aiming to tap into the country’s growing tech talent pool." />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img src="/news-sample.png" />}
                            >
                                <Meta title="Tech Giant Unveils New AI Tool" description="A leading tech company launches an innovative AI tool designed to boost productivity across industries." />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img src="/news-sample.png" />}
                            >
                                <Meta title="New HRM Software Hits the Market" description="A cutting-edge human resource management platform promises to streamline corporate hiring and training." />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img src="/news-sample.png" />}
                            >
                                <Meta title="Global Markets Surge After Economic Report" description="Stock markets worldwide rise sharply following a positive economic growth forecast released today." />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img src="/news-sample.png" />}
                            >
                                <Meta title="Breakthrough in Renewable Energy Research" description="Scientists announce a new solar panel design that doubles energy efficiency at half the cost." />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img src="/news-sample.png" />}
                            >
                                <Meta title="Startup Secures $50M in Funding" description="A promising tech startup receives major investment to expand its AI-driven healthcare solutions." />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>

            {/* Footer */}
            <Footer className={styles.footer}>
                <Row gutter={[16, 16]}>
                    {/* Logo TH */}
                    <Col span={6}>
                        <Link href="/homepage">
                            <Image src="/logo-th.png" alt="TH Logo" width={180} height={180} />
                        </Link>
                    </Col>

                    {/* Mạng xã hội */}
                    <Col span={6}>
                        <Title level={4}>Social Media</Title>
                        <div>
                            <ul style={{ listStyleType: 'none', padding: 0, }}>
                                <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
                                <li><a href="https://youtube.com" target="_blank">Youtube</a></li>
                                <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
                                <li><a href="https://tiktok.com" target="_blank">Tiktok</a></li>
                                <li><a href="https://zalo.me" target="_blank">Zalo</a></li>
                            </ul>
                        </div>
                    </Col>

                    {/* Địa chỉ và liên hệ */}
                    <Col span={6}>
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

                    {/* Bản đồ (OpenStreetMap) */}
                    <Col span={6}>
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