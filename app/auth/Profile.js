import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import SkinConditionPicker from "../../components/SkinConditionPicker";
import BackButton from "../../components/BackButton";
import InputField from "../../components/InputField";
import AuthButton from "../../components/AuthButton";

const LineBreak = () => {
  return <View className="w-full h-[1px] bg-black/30 mt-2 mb-4" />;
};

const PersonalDetailInput = ({ label, value, onChange }) => {
  return (
    <View className="flex flex-row gap-6 items-center">
      <Text className="font-roboto_medium text-xl text-black">{label}</Text>

      <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        importantForAutofill="no"
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize="none"
        keyboardType="default"
        maxLength={256}
        className="font-roboto_regular text-xl text-black"
      />
    </View>
  );
};

export default Profile = () => {
  const [name, setName] = useState("Emma");
  const [email, setEmail] = useState("emma2409@gmail.com");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSkinConditions, setActiveSkinConditions] = useState([]);

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView className="flex flex-col w-full h-full gap-y-6 px-6 bg-white">
          <View className="absolute left-6">
            <BackButton
              onPress={() => setModalVisible(!modalVisible)}
              iconName="close-outline"
            />
          </View>
          <View className="flex flex-row w-full h-12 items-center justify-center mb-12">
            <Text className="font-roboto_medium text-xl text-black">
              Ändra lösenord
            </Text>
          </View>
          <Text className="font-roboto_regular text-base text-black">
            Lösenordet måste innehålla minst 6 tecken och bestå av en
            kombination av siffror, bokstäver och specialtecken (!$@%).
          </Text>
          <InputField
            onChangeText={setNewPassword}
            placeHolder="Nytt lösenord"
            cornerRadius="10"
            sensitive={true}
            type="current-password"
          />
          <InputField
            onChangeText={setConfirmedNewPassword}
            placeHolder="Skriv ditt nya lösenord igen"
            cornerRadius="10"
            sensitive={true}
            type="current-password"
          />
          <View className="absolute bottom-6 w-full mx-6">
            <AuthButton
              label="Ändra lösenord"
              backgroundColor="#594359"
              textColor="#ffffff"
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <ScrollView className="px-6 bg-white">
        <View className="flex flex-row justify-between items-center w-full h-12">
          <BackButton />
          <Text className="font-roboto_medium text-xl font-black">
            Min profil
          </Text>
          <Text className="font-roboto_regular text-xl text-[#6C757D]">
            Spara
          </Text>
        </View>
        <View className="flex w-full h-44 items-center my-12">
          <View className="w-44 h-44 bg-slate-400 rounded-full" />
        </View>
        <View className="flex flex-col w-full">
          <Text className="font-roboto_medium text-xl text-[#6C757D]">
            Redigera profil
          </Text>
          <LineBreak />
          <PersonalDetailInput label="Namn" value={name} onChange={setName} />
          <LineBreak />
          <PersonalDetailInput
            label="Email"
            value={email}
            onChange={setEmail}
          />
          <LineBreak />
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            className="flex w-1/2 h-9 bg-[#594359] items-center justify-center rounded-lg mb-2"
          >
            <Text className="font-roboto_medium text-xl text-white">
              Ändra lösenord
            </Text>
          </TouchableOpacity>
          <LineBreak />
          <Text className="font-roboto_medium text-xl text-[#6C757D]">
            Min hud
          </Text>
          <LineBreak />
          <SkinConditionPicker
            activeSkinConditions={activeSkinConditions}
            setActiveSkinConditions={setActiveSkinConditions}
          />
          <LineBreak />
          <LineBreak />
          <TouchableOpacity className="mb-2">
            <Text className="font-roboto_medium text-xl text-black text-center">
              Logga ut
            </Text>
          </TouchableOpacity>
          <LineBreak />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};