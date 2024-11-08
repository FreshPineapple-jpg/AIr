import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    calloutContainer: {
        width: 200,
        padding: 10,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    summaryCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    summaryTemp: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    summaryDesc: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
    },
    summaryAqi: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    searchContainer: {
        position: 'absolute',
        top: 40,
        left: 10,
        right: 10,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
    },
    locationButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        marginLeft: 10,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    legendContainer: {
        position: 'absolute',
        top: 100,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    legendTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    legendColor: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    legendText: {
        fontSize: 12,
    },
    safetyBanner: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    safetyBannerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    safetyStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    dataCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        maxHeight: 300,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scrollContainer: {
        padding: 15,
    },
    dataSection: {
        marginBottom: 15,
    },
    dataHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    dataTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    mainValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    conditionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    conditionValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    aqiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    aqiValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    safetySection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
    safetyText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    collapsibleSection: {
        marginBottom: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    collapsibleContent: {
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    temperatureSection: {
        marginBottom: 15,
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    conditionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    aqiHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    conditionItem: {
        padding: 8,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        margin: 4,
        flex: 1,
    },
    aqiItem: {
        padding: 8,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        margin: 4,
        width: '45%',
    },
    conditionLabel: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    aqiLabel: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
});