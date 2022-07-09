import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ru'

export function convertDate(date: string) {
    dayjs.extend(relativeTime)
    dayjs.locale('ru')

    const today = new Date().getDate();
    const day = Number(dayjs(date).format("D"))
    const watch = dayjs(date).format("H:mm")
    const GTMStamp = new Date(date).toLocaleTimeString("ru-Ru", { timeZoneName: "short" }).split(' ')[1]
    const dayFromNow = dayjs(date).fromNow()
    let textDay = ""

    if (today === day) {
        textDay = "Сегодня"
    } else if ((today - day) === 1) {
        textDay = "Вчера"
    }

    return ((today - day) > 1 ? dayFromNow : textDay) + ", " + watch + " i-" + GTMStamp
}