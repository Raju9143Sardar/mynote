import { useState } from 'react';
import { Modal, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Card,
    Checkbox,
    FAB,
    HelperText,
    Icon,
    Menu,
    RadioButton,
    Snackbar,
    Text,
    TextInput,
    useTheme
} from 'react-native-paper';

import LottieView from 'lottie-react-native';




//###################### spacer react-native-paper ###########################
export const SpacerPaper = ({ size }: { size: number }) => <View style={{ height: size }} />;


//###################### Loader react-native-paper ###########################
export const FullScreenLoaderPaper = ({ visible, size = 'small', message = 'Loading...', }
    : { visible: boolean, size?: 'small'| 'large', message?: string; }) => {
    const { colors } = useTheme();

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center',alignItems: 'center',}}>
                <View style={{ padding: 24, borderRadius: 30, alignItems: 'center', minWidth: 150, elevation: 5,backgroundColor: colors.surface }}>
                    <ActivityIndicator
                        animating={true}
                        size={size}
                        color={colors.primary}
                    />

                    <Text
                        style={{
                            marginTop: 12,
                            color: colors.onSurface,
                        }}
                    >
                        {message}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};


//###################### Input Text react-native-paper ###########################
export const InputTextPaper = ({ label, value, onChangeText, placeholder, error, secureTextEntry = false, }
    : {
        label: string; value: string;
        onChangeText: (text: string) => void;
        placeholder: string;
        error?: string; // error message
        secureTextEntry?: boolean;
    }) => {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const hasError = !!error
    return (
        <View style={{ marginBottom: 8 }}>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                mode="outlined"
                secureTextEntry={secureTextEntry}
                // 🔹 Theme Colors
                selectionColor={colors.primaryContainer}
                cursorColor={colors.primary}

                // 🔹 Outline colors (important)
                outlineColor={hasError ? colors.error : colors.outline}
                activeOutlineColor={hasError ? colors.error : colors.primary}

                // 🔹 Focus handling
                onFocus={() => setIsFocused(true)}
                onBlur={() => { setIsFocused(false) }}


                // 🔹 Right icon (Clear button)
                right={
                    value ? (
                        <TextInput.Icon
                            icon="close"
                            onPress={() => onChangeText('')}
                        />
                    ) : undefined
                }

                // 🔹 Style
                style={{
                    backgroundColor: colors.surface,
                }}
            />

            {/*  Error / Helper Text */}

            {hasError && (

                <HelperText type={hasError ? 'error' : 'info'} visible={true}>
                    {hasError ? error : ''}
                </HelperText>
            )}
        </View>
    );
};


//###################### Input Password react-native-paper ###########################
export const InputPasswordPaper = ({ label, value, onChangeText, placeholder, error }
    : { label: string; value: string; onChangeText: (text: string) => void; placeholder: string; error?: string }) => {
    const [secure, setSecure] = useState(true);
    const hasError = !!error;

    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={{ marginBottom: 8 }}>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secure}
                mode="outlined"
                error={!!error}

                // 🔹 Theme Colors
                selectionColor={colors.primary}
                cursorColor={colors.primary}

                // 🔹 Outline colors (important)
                outlineColor={hasError ? colors.error : colors.outline}
                activeOutlineColor={hasError ? colors.error : colors.primary}

                right={
                    <TextInput.Icon
                        icon={secure ? 'visibility' : 'visibility-off'}
                        onPress={() => setSecure(!secure)}
                    />
                }

                // 🔹 Style
                style={{
                    backgroundColor: colors.surface,
                }}
            />

            {/* Error / Helper Text */}
            {hasError && (
                <HelperText type={hasError ? 'error' : 'info'} visible={true}>
                    {hasError ? error : ''}
                </HelperText>
            )}
        </View>
    );
};


//############# Menu (select dropdown list) react-native-paper ################


type Option = {
    label: string;
    value: string;
};


export const InputSelectPaper = ({ label, value, onSelect, options, placeholder, error, }
    : { label: string; value: string; onSelect: (value: string) => void; options: Option[]; placeholder?: string; error?: string; }) => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);

    const hasError = !!error;

    const selectedLabel =
        options.find(item => item.value === value)?.label || '';

    return (
        <View style={{ marginBottom: 8 }}>
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                    <TextInput
                        label={label}
                        value={selectedLabel}
                        placeholder={placeholder}
                        mode="outlined"
                        editable={false} // 🔒 prevent typing

                        selectionColor={colors.primaryContainer}
                        cursorColor={colors.primary}
                        onPressIn={() => setVisible(true)} // open dropdown

                        outlineColor={hasError ? colors.error : colors.outline}
                        activeOutlineColor={hasError ? colors.error : colors.primary}

                        right={
                            <TextInput.Icon
                                icon={visible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                onPress={() => setVisible(true)}
                            />
                        }

                        

                        style={{
                            backgroundColor: colors.surface,
                        }}
                    />
                }
            >
                {options.map(item => (
                    <Menu.Item
                        key={item.value}
                        onPress={() => {
                            onSelect(item.value);
                            setVisible(false);
                        }}
                        title={item.label}
                    />
                ))}
            </Menu>

            {/* Error Text */}
            {hasError && (
                <HelperText type="error" visible={true}>
                    {error}
                </HelperText>
            )}
        </View>
    );
};




//#################### Radio Group react-native-paper ########################
export const RadioGroupPaper = ({ options, value, onValueChange, error }
    : { options: { label: string; value: string }[]; value: string; onValueChange: (value: string) => void; error?: string }) => {

    const { colors } = useTheme(); // ✅ added
    const hasError = !!error;

    return (
        <View style={{ marginBottom: 3 }}>
            <RadioButton.Group onValueChange={onValueChange} value={value}>
                {options.map((option) => (
                    <View
                        key={option.value}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3,
                        }}
                    >
                        <RadioButton
                            value={option.value}
                            color={colors.primary}   // ✅ selected color
                            uncheckedColor={colors.outline} // ✅ unselected color
                        />

                        <Text style={{ color: colors.onSurface }}>
                            {option.label}
                        </Text>
                    </View>
                ))}
            </RadioButton.Group>

            {/*  Error / Helper Text */}
            {hasError && (
                <HelperText type={hasError ? 'error' : 'info'} visible={true}>
                    {hasError ? error : ''}
                </HelperText>
            )}


        </View>
    );
};

//###################### Checkbox react-native-paper ###########################
export const CheckboxPaper = ({ label, value, onValueChange, error }
    : { label: string; value: boolean; onValueChange: (value: boolean) => void; error?: string }) => {

    const { colors } = useTheme(); // ✅ added
    const hasError = !!error;

    return (
        <View style={{ marginBottom: 3 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                }}
            >
                <Checkbox
                    status={value ? 'checked' : 'unchecked'}
                    onPress={() => onValueChange(!value)}
                    color={colors.primary} // ✅ theme color
                    uncheckedColor={colors.outline} // ✅ optional
                />

                <Text style={{ color: colors.onSurface }}>
                    {label}
                </Text>
            </View>

            {/*  Error / Helper Text */}
            {hasError && (
                <HelperText type={hasError ? 'error' : 'info'} visible={true}>
                    {hasError ? error : ''}
                </HelperText>
            )}

        </View>


    );
};

//###################### Button react-native-paper ###########################
export const ButtonPaper = ({ title, onPress, disabled, }
    : { title: string; onPress: () => void; disabled?: boolean; }) => {

    const { colors } = useTheme();

    return (
        <Button
            mode="contained"
            onPress={onPress}
            disabled={disabled}
            style={{
                marginTop: 5,
                marginBottom: 5,
                marginHorizontal: 10,
                backgroundColor: disabled ? colors.onSurfaceDisabled : colors.primary, // ✅ theme color
            }}
            textColor={colors.surface} // ✅ text color
        >
            {title}
        </Button>
    );
};


//###################### Floating Action Button react-native-paper ###########################
export const FabPaper = ({ icon, onPress, label, buttonSize, disabled, }
    : { icon: string; onPress: () => void; label?: string; buttonSize?: number; disabled?: boolean; }) => {
    const { colors } = useTheme();

    return (
        <FAB
            icon={icon}
            label={label} // 👈 shows text if provided (extended FAB)
            onPress={onPress}
            disabled={disabled}
            size={buttonSize ? undefined : 'medium'} // default size
            customSize={buttonSize} // 👈 exact size control
            style={{
                position: 'absolute',
                right: 20,
                bottom: 20,
                backgroundColor: disabled
                    ? colors.onSurfaceDisabled
                    : colors.primary,
            }}
            color={colors.surface} // icon + text color
        />
    );
};



//##################### Card react-native-paper ###########################
export const CardPaper = ({ children }: { children: React.ReactNode }) => (
    <Card style={{ borderRadius: 25, elevation: 4, marginBottom: 5, padding: 10 }}>
        <Card.Content>
            {children}
        </Card.Content>
    </Card>
);


//#################### Snackbar react-native-paper ########################

export const SnackbarPaper = ({ visible, onDismiss, message, type }
    : { visible: boolean; onDismiss: () => void; message: string; type: 'success' | 'error' }) => {
    const { colors } = useTheme();
    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={3000}
            style={{
                backgroundColor: type === 'success' ? 'green' : 'red',
            }}
        >
            {message}
        </Snackbar>
    );
};


//##################### Card react-native-paper ###########################
export const DataNotFoundPaper = ({ source, loop }: { source: any; loop?: boolean }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <LottieView
        source={source}
        autoPlay
        loop = {loop}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};
