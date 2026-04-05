import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type CardProps = {
    placeholderText: string
    title: string
    description: string
    imageHeight?: number
}

const COLORS = {
    background: '#F5F1E8',
    darkGreen: '#1F5E4B',
    darkTeal: '#204B57',
    mediumTeal: '#395E66',
    darkBlue: '#1D3354',
    yellow: '#E2B93B',
    text: '#111111',
    textWhite: '#FFFFFF'
}

function Header() {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.topIconAjust}>
                <Ionicons name="menu" size={32} color={COLORS.text} />
            </TouchableOpacity>

            <View>
                <Image
                    source={require('@/assets/logo/sauf-logo.svg')}
                    contentFit="contain"
                    style={styles.logoImage}
                />
            </View>

            <TouchableOpacity style={styles.topIconAjust}>
                <Ionicons name="person-circle-outline" size={32} color={COLORS.text} />
            </TouchableOpacity>
        </View>
    )
}

function NavMenu() {
    return (
        <View style={styles.navMenuContainer}>
            <TouchableOpacity style={styles.navItem}>
                <FontAwesome5 name="graduation-cap" size={22} color={COLORS.text} />
                <Text style={styles.navText}>Universidades</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Ionicons name="trophy" size={22} color={COLORS.text} />
                <Text style={styles.navText}>Certificações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <MaterialCommunityIcons name="medal" size={24} color={COLORS.text} />
                <Text style={styles.navText}>Cursinhos</Text>
            </TouchableOpacity>
        </View>
    );
}

function Banner() {
    return (
        <View style={styles.bannerContainer}>
            <View style={styles.discountBadge}>
                <Text style={styles.discountText}>50%</Text>
                <Text style={styles.discountText}>off</Text>
            </View>
            <Text style={styles.bannerText}>Propaganda do{'\n'}cursinho</Text>
        </View>
    );
}

function Card({ placeholderText, title, description, imageHeight = 120 }: CardProps) {
    return (
        <View style={styles.cardContainer}>
            <View style={[styles.cardImagePlaceholder, { height: imageHeight }]}>
                <Text style={styles.cardImageText}>{placeholderText}</Text>
            </View>

            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
        </View>
    )
}

export default function Menu() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.screenContainer}>
                <Header />
                <NavMenu />
                <Banner />
                <View style={styles.gridRow}>
                    <View style={styles.halfColumn}>
                        <Card
                            placeholderText="Logo faculdade + procurada"
                            title="Nome faculdade"
                            description="is simply dummy text of the dummy text ever since the 1500s"
                        />
                    </View>
                    <View style={styles.halfColumn}>
                        <Card
                            placeholderText="Logo faculdade + procurada"
                            title="Nome faculdade"
                            description="is simply dummy text of the dummy text ever since the 1500s"
                        />
                    </View>
                </View>

                <View style={styles.fullColumn}>
                    <Card
                        placeholderText="Curso + procurado"
                        title="Nome do curso"
                        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                        imageHeight={140}
                    />
                </View>

                <View style={{ height: 40 }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    screenContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 2,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    logoImage: {
        width: 120,
        height: 32,
    },

    topIconAjust: {
        marginTop: 9,
    },

    navMenuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 20
    },

    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    navText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 8,
    },

    navArrow: {
        justifyContent: 'center',
        marginBottom: 20,
    },

    bannerContainer: {
        backgroundColor: COLORS.darkBlue,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },

    discountBadge: {
        backgroundColor: COLORS.yellow,
        borderRadius: 8,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },

    discountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },

    bannerText: {
        color: COLORS.textWhite,
        fontSize: 16,
        fontWeight: 'bold',
    },

    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    halfColumn: {
        width: '48%',
    },
    fullColumn: {
        width: '100%',
        marginBottom: 20,
    },

    cardContainer: {
        width: '100%',
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
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    cardTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 4,
    },

    cardDescription: {
        fontSize: 11,
        color: '#666',
        lineHeight: 16,
    },

})