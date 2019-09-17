package com.hrsl;

import androidx.multidex.MultiDexApplication;

import com.facebook.react.ReactApplication;
import com.wenkesj.voice.VoicePackage;
import org.reactnative.camera.RNCameraPackage;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import com.christopherdro.RNPrint.RNPrintPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new VoicePackage(),
          new RNCameraPackage(),
          new RNHTMLtoPDFPackage(),
          new RNPrintPackage(),
          new RNGestureHandlerPackage(),
          new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
