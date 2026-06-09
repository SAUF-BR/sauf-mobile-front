import { useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerMenu from '../components/DrawerMenu';

const LOGO_CAP        = require('@/assets/images/logo-cap.png');
const PROFILE_ICON    = require('@/assets/images/profile-icon.png');
const SEARCH_ICON     = require('@/assets/images/search-icon.png');
const BOLSAS_ICON     = require('@/assets/images/bolsas-icon.png');
const VOCACIONAL_ICON = require('@/assets/images/vocacional-icon.png');
const CURSINHOS_ICON  = require('@/assets/images/cursinhos-icon.png');
const INTEGRAL_IMG    = require('@/assets/images/integral.png');
const UNICESUMAR_IMG  = require('@/assets/images/unicesumar.png');
const UNIASSELVI_IMG  = require('@/assets/images/uniasselvi.png');
const MEDICINA_IMG    = require('@/assets/images/medicina.png');

const UNICESUMAR_URL = 'https://inscricoes.unicesumar.edu.br/';
const UNIASSELVI_URL = 'https://portal.uniasselvi.com.br/cursos';

const openLink = (url: string) => {
  Linking.openURL(url).catch(() => console.warn('Não foi possível abrir:', url));
};

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { width } = Dimensions.get('window');
  const isDesktop = width >= 768;
  const contentWidth = isDesktop ? 600 : width;
  const cardWidth = isDesktop ? (600 - 48) / 2 : (width - 48) / 2;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.headerWrapper, isDesktop && styles.headerWrapperDesktop]}>
          <View style={[styles.header, { width: isDesktop ? contentWidth : '100%' }]}>
            <TouchableOpacity
              onPress={() => setDrawerOpen(!drawerOpen)}
              style={styles.menuButton}
            >
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <Image
                source={LOGO_CAP}
                style={isDesktop ? styles.logoCapDesktop : styles.logoCap}
                resizeMode="contain"
              />
            </View>

            <TouchableOpacity style={styles.profileButton}>
              <Image source={PROFILE_ICON} style={styles.profileIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

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
              <Image source={SEARCH_ICON} style={styles.searchIcon} resizeMode="contain" />
            </View>

            <View style={styles.quickAccess}>
              <TouchableOpacity style={styles.quickItem}>
                <Image source={BOLSAS_ICON} style={isDesktop ? styles.quickIconDesktop : styles.quickIcon} resizeMode="contain" />
                <Text style={isDesktop ? styles.quickLabelDesktop : styles.quickLabel}>Bolsas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickItem}>
                <Image source={VOCACIONAL_ICON} style={isDesktop ? styles.quickIconDesktop : styles.quickIcon} resizeMode="contain" />
                <Text style={isDesktop ? styles.quickLabelDesktop : styles.quickLabel}>Teste Vocacional</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickItem}>
                <Image source={CURSINHOS_ICON} style={isDesktop ? styles.quickIconDesktop : styles.quickIcon} resizeMode="contain" />
                <Text style={isDesktop ? styles.quickLabelDesktop : styles.quickLabel}>Cursinhos</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.banner} activeOpacity={0.9}>
              <Image source={INTEGRAL_IMG} style={isDesktop ? styles.bannerLogoDesktop : styles.bannerLogo} resizeMode="cover" />
              <View style={styles.bannerContent}>
                <Text style={isDesktop ? styles.bannerTitleDesktop : styles.bannerTitle}>
                  Transformando esforço em aprovação!
                </Text>
                <Text style={isDesktop ? styles.bannerSubtitleDesktop : styles.bannerSubtitle}>
                  Até 50% de desconto
                </Text>
              </View>
            </TouchableOpacity>

            <Text style={isDesktop ? styles.sectionTitleDesktop : styles.sectionTitle}>
              Mais Procurados:
            </Text>

            <View style={styles.cardsRow}>
              <TouchableOpacity
                style={[styles.card, { width: cardWidth }]}
                activeOpacity={0.85}
                onPress={() => openLink(UNICESUMAR_URL)}
              >
                <Image source={UNICESUMAR_IMG} style={[styles.cardImage, { height: cardWidth }]} resizeMode="cover" />
                <Text style={isDesktop ? styles.cardNameDesktop : styles.cardName}>UniCesumar</Text>
                <Text style={isDesktop ? styles.cardSubtitleDesktop : styles.cardSubtitle}>
                  Ensino Presencial, Semipresencial e a Distância
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.card, { width: cardWidth }]}
                activeOpacity={0.85}
                onPress={() => openLink(UNIASSELVI_URL)}
              >
                <Image source={UNIASSELVI_IMG} style={[styles.cardImage, { height: cardWidth }]} resizeMode="cover" />
                <Text style={isDesktop ? styles.cardNameDesktop : styles.cardName}>Uniasselvi</Text>
                <Text style={isDesktop ? styles.cardSubtitleDesktop : styles.cardSubtitle}>
                  Ensino Semipresencial e a Distância
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.courseCard} activeOpacity={0.9}>
              <Image source={MEDICINA_IMG} style={isDesktop ? styles.courseImageDesktop : styles.courseImage} resizeMode="cover" />
              <Text style={isDesktop ? styles.courseNameDesktop : styles.courseName}>Medicina</Text>
              <Text style={isDesktop ? styles.courseDescriptionDesktop : styles.courseDescription}>
                O curso de Medicina forma profissionais preparados para cuidar da saúde,
                diagnosticar doenças e promover qualidade de vida.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <DrawerMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },

  // Header
  headerWrapper: {
    backgroundColor: '#F5F1E8',
  },
  headerWrapperDesktop: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0DDD5',
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
  hamburgerLine: {
    width: 22,
    height: 2,
    backgroundColor: '#1A1A1A',
    marginVertical: 2,
    borderRadius: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCap: {
    width: 100,
    height: 40,
  },
  logoCapDesktop: {
    width: 140,
    height: 54,
  },
  profileButton: {
    padding: 2,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  // Scroll
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
    backgroundColor: '#DEDEDE',
    borderWidth: 1,
    borderColor: '#CECECE',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#888',
  },

  // Quick Access
  quickAccess: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  quickItem: {
    alignItems: 'center',
    gap: 6,
  },
  quickIcon: {
    width: 36,
    height: 36,
  },
  quickIconDesktop: {
    width: 48,
    height: 48,
  },
  quickLabel: {
    fontSize: 11,
    color: '#1A1A1A',
    textAlign: 'center',
    maxWidth: 70,
  },
  quickLabelDesktop: {
    fontSize: 13,
    color: '#1A1A1A',
    textAlign: 'center',
    maxWidth: 90,
  },

  // Banner
  banner: {
    backgroundColor: '#1D3354',
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
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 18,
  },
  bannerTitleDesktop: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 24,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.85,
  },
  bannerSubtitleDesktop: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.85,
  },

  // Section title
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  sectionTitleDesktop: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },

  // Cards
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 10,
  },
  cardImage: {
    width: '100%',
    borderRadius: 10,
  },
  cardName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 8,
    marginHorizontal: 8,
  },
  cardNameDesktop: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 10,
    marginHorizontal: 10,
  },
  cardSubtitle: {
    fontSize: 10,
    color: '#868686',
    marginTop: 2,
    marginHorizontal: 8,
    lineHeight: 13,
  },
  cardSubtitleDesktop: {
    fontSize: 12,
    color: '#868686',
    marginTop: 4,
    marginHorizontal: 10,
    lineHeight: 16,
  },

  // Course card
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 12,
  },
  courseImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  courseImageDesktop: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
  courseName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 8,
    marginHorizontal: 10,
  },
  courseNameDesktop: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 12,
    marginHorizontal: 14,
  },
  courseDescription: {
    fontSize: 11,
    color: '#868686',
    marginTop: 4,
    marginHorizontal: 10,
    lineHeight: 16,
  },
  courseDescriptionDesktop: {
    fontSize: 13,
    color: '#868686',
    marginTop: 6,
    marginHorizontal: 14,
    lineHeight: 20,
  },
});