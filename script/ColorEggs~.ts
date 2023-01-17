class _ColorEggs_2023 {
  /**
   * key
   */
  public key(key: string): void {
    console.log(key, key.indexOf('NDYgVGlhbkx1byBIdQ') != -1, sha256(key));
    
    if(key.indexOf('NDYgVGlhbkx1byBIdQ') != -1)
      if(sha256(key, false) == '505c37f6125303e8701a60642d69bcc60ed35eeff5600e17354a7d4856128938') {
        articleHelper.absolutelyJump('Tianluo-HappyBirthday')
        
      };
  };
  /**
   * summonKey
   */
  public summonKey() {
    return sha256(`NDYgVGlhbkx1byBIdQ Today ${(new Date().getFullYear ())} 01 17`);
  };
};
var ColorEggs = new _ColorEggs_2023();