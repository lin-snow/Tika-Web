import { id } from "date-fns/locale";

const toast = useToast();

// NotificationColor
export enum NotificationColor {
    success = "green",
    error = "red",
    warning = "yellow",
    info = "gray"
}

// items
const items = [
    { icon: "i-fluent-checkmark-starburst-16-filled", color: NotificationColor.success, id: 1 },
    { icon: "i-fluent-error-circle-12-filled", color: NotificationColor.error, id: 2 },
    { icon: "i-fluent-warning-20-filled", color: NotificationColor.warning, id: 3 },
    { icon: "i-fluent-info-16-filled", color: NotificationColor.info, id: 4 },
];

interface NotificationProps {
    id: number;
    icon: string;
    color: NotificationColor;
    title: string;
    description: string;
    timeout: number;
}


const propsIndex = ref(0);
const notificationProps = reactive<NotificationProps>({
    id: items[propsIndex.value].id,
    icon: items[propsIndex.value].icon,
    color: items[propsIndex.value].color,
    title: "Notification Title",
    description: "Notification Description",
    timeout: 5000,
});

// Notify
export const notify = (title: string, description: string, timeout: number, type: NotificationColor) => {
    if (type === NotificationColor.success) {
        propsIndex.value = 0;
    } else if (type === NotificationColor.error) {
        propsIndex.value = 1;
    } else if (type === NotificationColor.warning) {
        propsIndex.value = 2;
    } else if (type === NotificationColor.info) {
        propsIndex.value = 3;
    }

    toast.add({
        title: notificationProps.title,
        description: notificationProps.description,
        icon: notificationProps.icon,
        color: notificationProps.color,
        timeout: notificationProps.timeout,
    })
}

