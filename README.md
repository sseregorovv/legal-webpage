# Сергей Егоров — юридическая практика

Персональный сайт для GitHub Pages: https://esslaw.ru/.

Это обычный статический сайт. Установка Node.js, npm и отдельная сборка для публикации не требуются. HTML, CSS, JavaScript, фотографии и калькулятор находятся в этом репозитории.

## Как обновить сайт через GitHub Desktop

1. Откройте репозиторий `legal-webpage` в GitHub Desktop. Рабочая ветка — `main`.
2. Нажмите **Fetch origin**. Если программа предлагает **Pull origin**, сначала получите последние изменения.
3. Откройте папку репозитория через **Repository → Show in Explorer** и измените нужные файлы в редакторе.
4. Вернитесь в GitHub Desktop и просмотрите вкладку **Changes**.
5. В поле **Summary** напишите, что изменили, например «Обновил описание услуг», и нажмите **Commit to main**.
6. Нажмите **Push origin**. GitHub Pages обновит сайт после обработки коммита.
7. Проверьте https://esslaw.ru/. Если видна старая версия, выполните принудительное обновление страницы: **Ctrl+F5**.

Статус публикации можно посмотреть на вкладке **Actions** репозитория на GitHub.

## Где что менять

| Файл | Содержимое |
| --- | --- |
| `index.html` | Главная страница: представление, услуги, порядок работы, отзывы, проекты и контакты |
| `page-razvod.html` | Семейные споры |
| `page-zhilishchnye.html` | Жилищные споры |
| `page-trud.html` | Трудовые споры |
| `page-vziskanie.html` | Помощь бизнесу и взыскание задолженности |
| `privacy-policy.html` | Политика обработки персональных данных |
| `assets/styles.css` | Цвета, шрифты, расположение блоков и мобильная версия |
| `assets/site.js` | Мобильное меню и раскрывающиеся ответы на вопросы |
| `assets/sergey-egorov.jpg` | Фотография на главном экране |
| `assets/practice-desk.jpg` | Фотография в разделе о работе |
| `calculator/index.html` | Проект «Время вместе» — калькулятор поколений |
| `CNAME` | Домен `esslaw.ru`; сохраняйте этот файл при обновлениях |
| `.nojekyll` | Публикация готовых статических файлов без обработки Jekyll |

Контакты повторяются на главной и на страницах услуг. Если меняете телефон, почту или ссылку на мессенджер, обновите их во всех этих HTML-файлах.

## Настройки GitHub Pages

В **Settings → Pages** используйте:

- **Source:** Deploy from a branch.
- **Branch:** main.
- **Folder:** /(root).
- **Custom domain:** esslaw.ru.

Если действующий сайт уже использует эти настройки, повторно менять их не нужно.

## Как в дальнейшем добавить PDF

Для материалов можно создать папку `materials` и положить туда PDF с коротким латинским именем, например `arbitration-court-timezones.pdf`.

В разделе материалов добавьте название, описание и дату проверки данных, а затем ссылки:

```html
<a href="materials/arbitration-court-timezones.pdf" target="_blank" rel="noopener">Открыть PDF</a>
<a href="materials/arbitration-court-timezones.pdf" download>Скачать PDF</a>
```

После этого опубликуйте изменения тем же способом через **Commit to main → Push origin**. Сам раздел материалов пока не добавлен.

## Справка GitHub

- [Публикация GitHub Pages из ветки](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Изменения и коммиты в GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)
