# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


typings =[
  ["二度あることは三度ある。", "にどあることはさんどある。", "テスト"],
  ["明日天気になーれ。","あしたてんきになーれ。", "テスト"],
  ["東京特許許可局","とうきょうとっきょきょかきょく", "テスト"],
  ["隣の客はよく柿食う客だ。","となりのきゃくはよくかきくうきゃくだ。", "テスト"],
  ["生麦生米生卵","なまむぎなまごめなまたまご", "テスト"],
  ["人生楽ありゃ苦もあるさ〜","じんせいらくありゃくもあるさ〜", "テスト"],
  ["寿司打を超えた使いやすさ！","すしだをこえたつかいやすさ！", "テスト"],
  ["いい気分になることだけしかしなくていい！","いいきぶんになることだけしかしなくていい！", "テスト"],
  ["テックキャンプは楽しいな！","てっくきゃんぷはたのしいな！", "テスト"],
  ["ツイッターで拡散してね！","ついったーでかくさんしてね！", "テスト"]
]

typings.each do |typing|
  Typing.create(original: typing[0], hiragana: typing[1], category: typing[2])
end