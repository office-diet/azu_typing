# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

categories = ["仕事のアファーメーション", "健康のアファーメーション", "人間関係のアファーメーション", "お金のアファーメーション"]

typings =[
  ["二度あることは三度ある。", "にどあることはさんどある。"],
  ["明日天気になーれ。","あしたてんきになーれ。"],
  ["東京特許許可局","とうきょうとっきょきょかきょく"],
  ["隣の客はよく柿食う客だ。","となりのきゃくはよくかきくうきゃくだ。"],
  ["生麦生米生卵","なまむぎなまごめなまたまご"],
  ["人生楽ありゃ苦もあるさー","じんせいらくありゃくもあるさー"],
  ["寿司打を超えた使いやすさ！","すしだをこえたつかいやすさ！"],
  ["いい気分になることだけしかしなくていい！","いいきぶんになることだけしかしなくていい！"],
  ["テックキャンプは楽しいな！","てっくきゃんぷはたのしいな！"],
  ["ツイッターで拡散してね！","ついったーでかくさんしてね！"],
  ["私はあらゆることでどんどん良くなっている。", "わたしはあらゆることでどんどんよくなっている。"],
  ["私の元にお金がじゃんじゃん入ってくる。", "わたしのもとにおかねがじゃんじゃんはいってくる。"],
  ["私は歳を取るたびに若返る。", "わたしはとしをとるたびにわかがえる。"],
  ["ありがとう、ごめんなさい、許してください、愛しています。", "ありがとう、ごめんなさい、ゆるしてください、あいしています。"],
  ["私は完璧な人間だ。", "わたしはかんぺきなにんげんだ。"],
  ["私はいつも自信に溢れている。", "わたしはいつもじしんにあふれている。"],
  ["私には助けてくれる友人がたくさんいる。", "わたしにはたすけてくれるゆうじんがたくさんいる。"],
  ["私は世の中の人から必要とされている。", "わたしはよのなかのひとからひつようとされている。"],
  ["私には意思がある。", "わたしにはいしがある。"],
  ["大きく考えなさい。", "おおきくかんがえなさい。"],
  ["危険だ、という道は必ず、自分の行きたい道なのだ。", "きけんだ、というみちはかならず、じぶんのいきたいみちなのだ。"],
  ["私は凄くなる道のりを自分の足でいま歩いている。", "わたしはすごくなるみちのりをじぶんのあしでいまあるいている。"]

]

typings.each do |typing|
  Typing.create(original: typing[0], hiragana: typing[1] )
end

categories.each do |category|
  Category.create(name: category)
end

# 22.times do |num|
#   typing_id = num + 1
#   4.times do |cat|
#     TypingsCategory.create(typing_id: num + 1, category_id: cat + 1)
#   end
# end