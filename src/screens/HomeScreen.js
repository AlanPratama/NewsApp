import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from "axios";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";

export default function HomeScreen() {
  const categoryNews = [
    "hiburan",
    "olahraga",
    "sepakbola",
    "terkini",
    "ekonomi",
    "metro",
    "lifestyle",
    "humaniora",
    "tekno",
    "otomotif",
    "top-news",
    "politik",
    "hukum",
    "warta-bumi",
  ];

  const baseUrl = "https://berita-indo-api-next.vercel.app/api/antara-news";

  const navigation = useNavigation();

  const [activeCategory, setActiveCategory] = useState("nasional");
  const [breakingNews, setBreakingNews] = useState([]);
  const [newsByCat, setNewsByCat] = useState([]);

  const getBreakingNews = async () => {
    const res = await axios.get(
      `${baseUrl}/terkini`
    );
    setBreakingNews(res.data.data);
  };

  const getNewsByCat = async (cat = "hiburan") => {
    const res = await axios.get(`${baseUrl}/${cat}`);
    
    setActiveCategory(cat);
    setNewsByCat(res.data.data);
  };

  useEffect(() => {
    getNewsByCat();
    getBreakingNews();
  }, []);

  const convertIsoDateToReadable = (isoDate) => {
    const date = new Date(isoDate);

    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    return formattedDate;
  };

  return (
    <View className="flex-1 bg-white">
      {breakingNews.length == 0 || newsByCat.length == 0 ? (
        <Loading size="large" className="mt-20" />
      ) : (
        <Animated.View entering={FadeInDown} className="pt-10 mx-4">
          <StatusBar style="light" />
          {/* BREAKING NEWS */}
          <Text className="font-bold mb-2" style={{ fontSize: hp(3.7) }}>
            Berita Terkini
          </Text>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60, paddingTop: 30 }}
          >
            {breakingNews &&
              breakingNews.map((news, i) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailNews", { link: news.link })
                    }
                    key={i}
                  >
                    <View className="flex justify-center items-start gap-y-1 gap-x-1">
                      <Image
                        style={{ width: hp(30), height: hp(20) }}
                        className="mx-2 rounded-2xl"
                        source={{
                          uri: news.image,
                        }}
                      />
                      <Text
                        className="font-semibold"
                        style={{ fontSize: hp(2.2) }}
                      >
                        {news.title.length > 21
                          ? news.title.substring(0, 21) + "..."
                          : news.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>

          {/* CATEGORY NEWS */}
          <ScrollView
            className="mt-6 h-12"
            horizontal
            contentContainerStyle={{}}
            showsHorizontalScrollIndicator={false}
          >
            {categoryNews.map((cat, i) => {
              let isActiveCategory = cat == activeCategory;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => getNewsByCat(cat)}
                  className={`mr-2.5 py-2 px-3 rounded-full ${
                    !isActiveCategory ? "bg-gray-200" : "bg-blue-600"
                  }`}
                >
                  <Text
                    className={`font-medium capitalize ${
                      !isActiveCategory ? "text-neutral-700" : "text-white"
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* NEWS BY CATEGORY */}
          <Text
            className="capitalize font-bold mb-2 mt-4"
            style={{ fontSize: hp(3.7) }}
          >
            Berita {activeCategory}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {newsByCat &&
              newsByCat.map((news, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      navigation.navigate("DetailNews", { link: news.link })
                    }
                    className="mb-6 flex flex-row justify-start items-start gap-3"
                  >
                    <Image
                      style={{ width: hp(15), height: hp(16) }}
                      className="rounded-2xl"
                      source={{
                        uri: news.image,
                      }}
                    />
                    <View>
                      <Text className="text-blue-500 capitalize">
                        {activeCategory}
                      </Text>
                      <Text
                        className="text-neutral-800"
                        style={{ fontSize: hp(2.3) }}
                      >
                        {news.title.length > 23
                          ? news.title.substring(0, 23) + "..."
                          : news.title}
                      </Text>
                      <Text className="text-neutral-600">
                        {news.description}
                      </Text>
                      <Text>{convertIsoDateToReadable(news.isoDate)}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}
