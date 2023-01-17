async function websiteMain() {
  articleHelper.init(
    $('#Orz-Content')[0] as HTMLElement,
    '//www.furrycreakler.cn/assets/article/articleTable.json',
    '//www.furrycreakler.cn/script/library/articlehelper/articleConfig.json');
  articleHelper.absolutelyJump('Tianluo-HappyBirthday');
};