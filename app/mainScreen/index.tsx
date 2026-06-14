import DrawerMenu from '@/components/DrawerMenu'; // Mantivemos o drawer do seu colega
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
    background: '#F5F1E8',
    darkGreen: '#1F5E4B',
    darkTeal: '#204B57',
    mediumTeal: '#395E66',
    darkBlue: '#1D3354',
    yellow: '#E2B93B',
    text: '#111111',
    textWhite: '#FFFFFF',
    border: '#CECECE',
    grayText: '#868686'
};

interface Instituicao {
    id: string;
    nome: string;
    sigla: string;
    logoUrl: string | null;
}

interface Curso {
    id: string;
    nome: string;
    imagemPrincipalUrl: string | null;
    descricaoResumida: string;
    instituicao: Instituicao;
}

interface Anuncio {
    id: string;
    titulo: string;
    imagemUrl: string | null;
    linkDestino: string | null;
}

function Header({ onMenuPress, isDesktop, contentWidth }: any) {
    return (
        <View style={[styles.headerWrapper, isDesktop && styles.headerWrapperDesktop]}>
            <View style={[styles.header, { width: isDesktop ? contentWidth : '100%' }]}>
                <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
                    <Ionicons name="menu" size={32} color={COLORS.text} />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/logo/sauf-logo.svg')} // Única imagem local permitida
                        style={isDesktop ? styles.logoDesktop : styles.logoMobile}
                        contentFit="contain"
                    />
                </View>

                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-circle-outline" size={32} color={COLORS.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function QuickAccess({ isDesktop }: { isDesktop: boolean }) {
    return (
        <View style={styles.quickAccess}>
            <TouchableOpacity style={styles.quickItem}>
                <FontAwesome5 name="hand-holding-usd" size={isDesktop ? 32 : 24} color={COLORS.darkTeal} />
                <Text style={isDesktop ? styles.quickLabelDesktop : styles.quickLabel}>Bolsas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickItem}>
                <Ionicons name="compass-outline" size={isDesktop ? 34 : 26} color={COLORS.darkTeal} />
                <Text style={isDesktop ? styles.quickLabelDesktop : styles.quickLabel}>Teste Vocacional</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickItem}>
                <MaterialCommunityIcons name="medal-outline" size={isDesktop ? 36 : 28} color={COLORS.darkTeal} />
                <Text style={isDesktop ? styles.quickLabelDesktop : styles.quickLabel}>Cursinhos</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function HomeScreen() {
    const [searchText, setSearchText] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
    const { width } = Dimensions.get('window');
    const isDesktop = width >= 768;
    const contentWidth = isDesktop ? 600 : width;
    const cardWidth = isDesktop ? (600 - 48) / 2 : (width - 48) / 2;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resInst = await fetch('http://localhost:8080/api/instituicoes');
                setInstituicoes(await resInst.json());

                const resCursos = await fetch('http://localhost:8080/api/cursos');
                setCursos(await resCursos.json());

                const resAnuncios = await fetch('http://localhost:8080/api/anuncios');
                const anunciosData = await resAnuncios.json();
                if (anunciosData.length > 0) setAnuncio(anunciosData[0]);

            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        };

        fetchData();
    }, []);

    const openLink = (url?: string | null) => {
        if (url) Linking.openURL(url).catch(() => console.warn('Não foi possível abrir:', url));
    };

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.container}>
                <Header 
                    onMenuPress={() => setDrawerOpen(!drawerOpen)} 
                    isDesktop={isDesktop} 
                    contentWidth={contentWidth} 
                />

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.scrollContent,
                        isDesktop && styles.scrollContentDesktop,
                    ]}
                >
                    <View style={[styles.inner, { width: isDesktop ? contentWidth : '100%' }]}>
                        
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Busque por cursos e universidades"
                                placeholderTextColor="#B2B2B2"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                            <Ionicons name="search" size={20} color={COLORS.grayText} />
                        </View>

                        <QuickAccess isDesktop={isDesktop} />

                        {anuncio && (
                            <TouchableOpacity 
                                style={styles.banner} 
                                activeOpacity={0.9} 
                                onPress={() => openLink(anuncio.linkDestino)}
                            >
                                {anuncio.imagemUrl ? (
                                    <Image source={{ uri: anuncio.imagemUrl }} style={isDesktop ? styles.bannerLogoDesktop : styles.bannerLogo} />
                                ) : (
                                    <View style={styles.discountBadge}>
                                        <Text style={styles.discountText}>50%</Text>
                                        <Text style={styles.discountText}>off</Text>
                                    </View>
                                )}
                                <View style={styles.bannerContent}>
                                    <Text style={isDesktop ? styles.bannerTitleDesktop : styles.bannerTitle}>
                                        {anuncio.titulo}
                                    </Text>
                                    <Text style={isDesktop ? styles.bannerSubtitleDesktop : styles.bannerSubtitle}>
                                        Aproveite a oportunidade
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        <Text style={isDesktop ? styles.sectionTitleDesktop : styles.sectionTitle}>
                            Mais Procurados:
                        </Text>

                        <View style={styles.cardsRow}>
                            {instituicoes.slice(0, 2).map((inst) => (
                                <TouchableOpacity
                                    key={inst.id}
                                    style={[styles.card, { width: cardWidth }]}
                                    activeOpacity={0.85}
                                >
                                    {inst.logoUrl ? (
                                        <Image source={{ uri: inst.logoUrl }} style={[styles.cardImage, { height: cardWidth }]} />
                                    ) : (
                                        <View style={[styles.cardImagePlaceholder, { height: cardWidth }]}>
                                            <Text style={styles.cardImageText}>{inst.sigla || 'Logo'}</Text>
                                        </View>
                                    )}
                                    <Text style={isDesktop ? styles.cardNameDesktop : styles.cardName}>{inst.nome}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {cursos.map((curso) => (
                          <TouchableOpacity key={curso.id} style={styles.courseCard} activeOpacity={0.9}>
                              {curso.imagemPrincipalUrl ? (
                                  <Image 
                                      source={{ uri: curso.imagemPrincipalUrl }} 
                                      style={isDesktop ? styles.courseImageDesktop : styles.courseImage} 
                                      contentFit="cover"
                                  />
                              ) : (
                                  <View style={[styles.cardImagePlaceholder, { height: isDesktop ? 220 : 140, marginBottom: 0 }]}>
                                      <Text style={styles.cardImageText}>{curso.nome}</Text>
                                  </View>
                              )}
                              <Text style={isDesktop ? styles.courseNameDesktop : styles.courseName}>{curso.nome}</Text>
                              <Text style={isDesktop ? styles.courseDescriptionDesktop : styles.courseDescription}>
                                  {curso.descricaoResumida}
                              </Text>
                          </TouchableOpacity>
                      ))}

                    </View>
                </ScrollView>
            </SafeAreaView>

            <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    
    headerWrapper: {
        backgroundColor: COLORS.background,
    },
    headerWrapperDesktop: {
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.border,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    menuButton: {
        padding: 4,
        justifyContent: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoMobile: {
        width: 120,
        height: 32,
    },
    logoDesktop: {
        width: 140,
        height: 54,
    },
    profileButton: {
        padding: 2,
    },

    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    scrollContentDesktop: {
        alignItems: 'center',
        paddingTop: 16,
    },
    inner: {
        paddingHorizontal: 16,
        paddingBottom: 32,
    },

    // Search
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBEBEB',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.text,
    },

    quickAccess: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25,
        marginTop: 10,
    },
    quickItem: {
        alignItems: 'center',
        gap: 8,
    },
    quickLabel: {
        fontSize: 12,
        color: COLORS.text,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    quickLabelDesktop: {
        fontSize: 14,
        color: COLORS.text,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    banner: {
        backgroundColor: COLORS.darkBlue,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 20,
        gap: 16,
    },
    bannerLogo: {
        width: 64,
        height: 64,
        borderRadius: 10,
    },
    bannerLogoDesktop: {
        width: 90,
        height: 90,
        borderRadius: 12,
    },
    discountBadge: {
        backgroundColor: COLORS.yellow,
        borderRadius: 8,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    discountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    bannerContent: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textWhite,
        marginBottom: 4,
        lineHeight: 18,
    },
    bannerTitleDesktop: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textWhite,
        marginBottom: 6,
        lineHeight: 24,
    },
    bannerSubtitle: {
        fontSize: 12,
        color: COLORS.textWhite,
        opacity: 0.85,
    },
    bannerSubtitleDesktop: {
        fontSize: 14,
        color: COLORS.textWhite,
        opacity: 0.85,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
    },
    sectionTitleDesktop: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 16,
    },

    cardsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    cardImage: {
        width: '100%',
        borderRadius: 10,
    },
    cardImagePlaceholder: {
        backgroundColor: COLORS.mediumTeal,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
    },
    cardImageText: {
        color: COLORS.textWhite,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 8,
        marginHorizontal: 8,
    },
    cardNameDesktop: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 10,
        marginHorizontal: 10,
    },

    // Course Card (Retângulo Maior)
    courseCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        paddingBottom: 12,
        marginBottom: 15,
        // Sombras para iOS:
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    courseImage: {
        width: '100%',
        height: 140,
        // Arredondando apenas o topo da imagem para casar com o card
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    courseImageDesktop: {
        width: '100%',
        height: 220,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    courseName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 12,
        marginHorizontal: 10,
    },
    courseNameDesktop: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 12,
        marginHorizontal: 14,
    },
    courseDescription: {
        fontSize: 12,
        color: COLORS.grayText,
        marginTop: 4,
        marginHorizontal: 10,
        lineHeight: 16,
    },
    courseDescriptionDesktop: {
        fontSize: 13,
        color: COLORS.grayText,
        marginTop: 6,
        marginHorizontal: 14,
        lineHeight: 20,
    },
});