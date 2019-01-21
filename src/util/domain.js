import Storage from './localstorage';

const lang = Storage.get('lang') === 'zh' ? 'zh' : 'zh';
const test_tools_path = {
    zh: 'http://test.tools.mblockapp.makeblock.com/',
    en: 'http://testen.tools.mblockapp.makeblock.com/',
};
// const pro_tools_path = {
//     zh: '//tools.mblockapp.makeblock.com/',
//     en: '//en.tools.mblockapp.makeblock.com/',
// };
let domains = {
    category: test_tools_path[lang],
};

// if (process.env.NODE_ENV === 'production') {
//     domains.category = pro_tools_path[lang];
// }

export default domains;