import React, { useEffect, useState } from 'react';
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { createStyles } from './fileUpload.styles';
import {
  createRespondentFileUploadLink,
  uploadFile,
} from '../../../api/directAPI';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  OptionResponse,
  SurveyResponseQuestion,
} from '../../../types/types';

interface Props {
  surveyId: string;
  response: OptionResponse | OptionResponse[];
  respondentId: string;
  question: SurveyResponseQuestion;
  handleChange: (
    questionId: number,
    reply: string,
    optionId: number | null,
    isChecked: boolean
  ) => void;
}

const FileUpload: React.FC<Props> = ({
  surveyId,
  respondentId,
  question,
  response,
  handleChange,
}) => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  useEffect(() => {
    // If a filename was previously saved, restore it
    if (response && !Array.isArray(response) && response.reply) {
      setUploadedFileName(response.reply);
    } else {
      setUploadedFileName(null);
    }
  }, [response]);

  const handleFileChange = async () => {
    if (!surveyId || !respondentId || !question) {
      Alert.alert('Error', 'Invalid survey or respondent ID.');
      return;
    }

    try {
      setIsUploading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: false,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];

        if (asset?.uri && asset.name) {
          const responseFetch = await fetch(asset.uri);
          const blob = await responseFetch.blob();

          const file = new File([blob], asset.name, {
            type: asset.mimeType || 'application/octet-stream',
            lastModified: new Date().getTime(),
          });

          // Get presigned URL
          const { url } = await createRespondentFileUploadLink(
            surveyId,
            question.id,
            respondentId,
            file.name
          );

          // Upload the file
          await uploadFile(file, url);

          // Store just the filename
          setUploadedFileName(file.name);
          handleChange(question.id, file.name, null, false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'An error occurred while selecting or uploading the file.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
    handleChange(question.id, '', null, false);
  };

  return (
    <View style={styles.container}>
      {uploadedFileName ? (
        <View style={styles.filePreviewContainer}>
          <View style={styles.fileInfo}>
            <MaterialIcons
              name="insert-drive-file"
              size={24}
              color={theme.status.info}
            />
            <View style={styles.fileDetails}>
              <Text style={styles.fileName} numberOfLines={1}>
                {uploadedFileName}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleRemoveFile}
            style={styles.removeButton}
          >
            <MaterialIcons name="close" size={20} color={theme.status.error} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={handleFileChange}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator size="large" color={theme.status.info} />
          ) : (
            <>
              <MaterialIcons
                name="cloud-upload"
                size={40}
                color={theme.status.info}
              />
              <Text style={styles.uploadText}>Upload File</Text>
              <Text style={styles.uploadSubText}>
                Select a file from your device
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FileUpload;
