type AppbarAction = {
    icon: string;
    actionKey: string;
};

// Define the state for the app bar
type AppbarState = {
    title: string;
    showBackButton: boolean;
    actions: AppbarAction[];
};