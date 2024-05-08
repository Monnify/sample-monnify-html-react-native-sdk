import { FC, useState } from "react";
import { SafeAreaView, View } from "react-native";
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview";

interface SamplePageProps {
  onClose?: () => void;
}

const SamplePage: FC<SamplePageProps> = ({ onClose }) => {
  const [shouldCloseSdk, setShouldCloseSdk] = useState(false);
  const setNavigationState = (webview: WebViewNavigation) => {
    if (webview.url.includes("paymentReference")) {
      setShouldCloseSdk(true);
      onClose && onClose();
    }
  };

  const handleEvent = (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.data);
  };

  if (shouldCloseSdk) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={require("@/assets/index.html")}
          injectedJavaScript="payWithMonnify({amount: 100, customerName: 'charles', customerEmail: 'charles.onuorah@yahoo.com', customerMobileNumber: '08163113450'})"
          onNavigationStateChange={(webview) => {
            setNavigationState(webview);
          }}
          onMessage={handleEvent}
        />
      </View>
    </SafeAreaView>
  );
};

export default SamplePage;
