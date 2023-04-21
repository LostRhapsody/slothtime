if (!self.define) {
   let s,
      e = {};
   const t = (t, c) => (
      (t = new URL(t + ".js", c).href),
      e[t] ||
         new Promise((e) => {
            if ("document" in self) {
               const s = document.createElement("script");
               (s.src = t), (s.onload = e), document.head.appendChild(s);
            } else (s = t), importScripts(t), e();
         }).then(() => {
            let s = e[t];
            if (!s) throw new Error(`Module ${t} didn’t register its module`);
            return s;
         })
   );
   self.define = (c, i) => {
      const a =
         s ||
         ("document" in self ? document.currentScript.src : "") ||
         location.href;
      if (e[a]) return;
      let r = {};
      const d = (s) => t(s, a),
         l = { module: { uri: a }, exports: r, require: d };
      e[a] = Promise.all(c.map((s) => l[s] || d(s))).then((s) => (i(...s), r));
   };
}

define(["./workbox-d249b2c8"], function (s) {
   "use strict";
   self.addEventListener("message", (s) => {
      s.data && "SKIP_WAITING" === s.data.type && self.skipWaiting();
   }),
      s.precacheAndRoute(
         [
            { url: "about.html", revision: "84f0def8064b1db0cc188e0ad76c210f" },
            {
               url: "data/changelog/changelog.json",
               revision: "ab722e1ceaf055b5825bbba37b69b465",
            },
            { url: "index.html", revision: "550f1fce45a1b1dee6db5b6b4e9ed45d" },
            {
               url: "static/images/clipboard.svg",
               revision: "a6e3eaa3ea76c381f6916d89d3c091a1",
            },
            {
               url: "static/images/clock.svg",
               revision: "09aa393bf598bdc20350e5ca2022d838",
            },
            {
               url: "static/images/dev_badge.svg",
               revision: "6132e87a1cf7196a2bdd0ac1610f5be3",
            },
            {
               url: "static/images/download.svg",
               revision: "e93f287f8e394380bb469605258f2e82",
            },
            {
               url: "static/images/favicon.ico",
               revision: "dc205c5e2953bb76d07247efcf1e633b",
            },
            {
               url: "static/images/gear.svg",
               revision: "c03f4a03e3ed343ab88accc1e891fc02",
            },
            {
               url: "static/images/git_badge.svg",
               revision: "0deaf64201ad6680540f32113630f50e",
            },
            {
               url: "static/images/git.svg",
               revision: "485b23dab17b8fc25a29b59eb20a13f9",
            },
            {
               url: "static/images/github_badge.svg",
               revision: "9233a2d74496a049911e5f86ce534682",
            },
            {
               url: "static/images/info.svg",
               revision: "f53477d13d1ce1f0f3fd2569510a0602",
            },
            {
               url: "static/images/palette.svg",
               revision: "0fdb9d9b13425f35aa5af98ee4a08ae0",
            },
            {
               url: "static/images/sloth-icon.svg",
               revision: "2431209b07c563437e8d7cc697462962",
            },
            {
               url: "static/images/slothtime_icon_x128.png",
               revision: "55af6741488fb6c96a47935eef8e332d",
            },
            {
               url: "static/images/slothtime_icon_x192.png",
               revision: "1732ee2d1789c467df063ed87c4dfb49",
            },
            {
               url: "static/images/slothtime_icon_x384.png",
               revision: "0fe1c06cea232ba20a21e0437d872398",
            },
            {
               url: "static/images/slothtime_icon_x48.png",
               revision: "dc16e0c7214441af421f37274e631891",
            },
            {
               url: "static/images/slothtime_icon_x512.png",
               revision: "12e94a888dffafab644c75aaf9f15584",
            },
            {
               url: "static/images/slothtime_icon_x72.png",
               revision: "ff44d8cb3bab2e40b549f87263764912",
            },
            {
               url: "static/images/slothtime_icon_x96.png",
               revision: "af4a901747d2fdc9104421f9e1de634e",
            },
            {
               url: "static/images/slothtime_icon1024x1024.png",
               revision: "d4dee4710786b50af738a682eb057aec",
            },
            {
               url: "static/images/three_dots.svg",
               revision: "1771fca7a49d128c5c3b4347699711de",
            },
            {
               url: "static/scripts/clock.js",
               revision: "491c24bbb304f72fa7e3ef49f114667e",
            },
            {
               url: "static/scripts/er_app_anim.js",
               revision: "18897aabed707409fedd8d53a402a26f",
            },
            {
               url: "static/scripts/er_app_starttheme.js",
               revision: "b4650ec1204d1492876982e96079fcb2",
            },
            {
               url: "static/scripts/er_app_utils.js",
               revision: "167974cb95f8f5f1095e963c8a84dfab",
            },
            {
               url: "static/scripts/slothtime.js",
               revision: "bf9d787906c6bccf46745f2f2241bf31",
            },
            {
               url: "static/styles/er_apps_styles.css",
               revision: "496c91ece7421592d648eccc1559eabd",
            },
            {
               url: "static/styles/themes/_list.json",
               revision: "8bbdb2157b30761b4647cfa22ecfc3f7",
            },
            {
               url: "static/styles/themes/8008.css",
               revision: "b484ee68bd1e44d45161c74862f1746d",
            },
            {
               url: "static/styles/themes/80s_after_dark.css",
               revision: "b74be482bb381bfad855710295652a7c",
            },
            {
               url: "static/styles/themes/9009.css",
               revision: "591c64ce1bf624a03b877bba10c46edb",
            },
            {
               url: "static/styles/themes/aether.css",
               revision: "49992509d01517b1560fb03bbb95b7b6",
            },
            {
               url: "static/styles/themes/alduin.css",
               revision: "ec458d9b370bfb0b69b7a3d37087d4b5",
            },
            {
               url: "static/styles/themes/alpine.css",
               revision: "7ec6b4cb043c962c4d046251752c8e67",
            },
            {
               url: "static/styles/themes/arch.css",
               revision: "376a6efb9a8e6bab354ed8c97fdbacef",
            },
            {
               url: "static/styles/themes/atom_one_dark.css",
               revision: "9b601ae11b7b64d56ae25284bf34cb1d",
            },
            {
               url: "static/styles/themes/aurora.css",
               revision: "42b251a7f2f489679459a2a3c115dea8",
            },
            {
               url: "static/styles/themes/beach.css",
               revision: "d28fb9707ec9662c21d37d5c768611da",
            },
            {
               url: "static/styles/themes/bento.css",
               revision: "efcf0764650737528c739b07724a56cd",
            },
            {
               url: "static/styles/themes/bingsu.css",
               revision: "364287c67a66d86737f6e57cd4bd6c8c",
            },
            {
               url: "static/styles/themes/bliss.css",
               revision: "02ecaffab70ee1030a4065742409fb18",
            },
            {
               url: "static/styles/themes/blue_dolphin.css",
               revision: "295849aea85c07bf8aa296bcdd46db43",
            },
            {
               url: "static/styles/themes/blueberry_dark.css",
               revision: "e0ac3d9ece6470b87403200c71cd1595",
            },
            {
               url: "static/styles/themes/blueberry_light.css",
               revision: "540d22a85a85051db736e8faa1e17e52",
            },
            {
               url: "static/styles/themes/botanical.css",
               revision: "d60e6c5d4e449d6fef05f9351a1a56bb",
            },
            {
               url: "static/styles/themes/bouquet.css",
               revision: "3bc9195682837e9145cf8a9172ab427e",
            },
            {
               url: "static/styles/themes/breeze.css",
               revision: "1192e9b3b7a0c91f6f3acaf52e0205cd",
            },
            {
               url: "static/styles/themes/bushido.css",
               revision: "3f9814d50ae4b61ba3030e9effa05eae",
            },
            {
               url: "static/styles/themes/cafe.css",
               revision: "a5ef6869de883310fe1dd2694c8fa65a",
            },
            {
               url: "static/styles/themes/camping.css",
               revision: "012510cca04827eb562b78e38b1f3414",
            },
            {
               url: "static/styles/themes/carbon.css",
               revision: "976e5f21b93cb09245bd6da9aecfcef2",
            },
            {
               url: "static/styles/themes/catppuccin.css",
               revision: "9648bb77dbefd706d5cdc44ca67f19a7",
            },
            {
               url: "static/styles/themes/chaos_theory.css",
               revision: "6730a8a08e23f67bd1ee51d09ad676f4",
            },
            {
               url: "static/styles/themes/cheesecake.css",
               revision: "88cbaa87fb165356eb0dd94101f89392",
            },
            {
               url: "static/styles/themes/cherry_blossom.css",
               revision: "1632317663a39c46f6b4252550821d70",
            },
            {
               url: "static/styles/themes/comfy.css",
               revision: "7b6de93aa4ea7ef434a19000fed1d0b3",
            },
            {
               url: "static/styles/themes/copper.css",
               revision: "6c6ab56b545ba56435e0fb087c33b0ef",
            },
            {
               url: "static/styles/themes/creamsicle.css",
               revision: "fe14099370fb51606d755beb93fe4a7f",
            },
            {
               url: "static/styles/themes/cyberspace.css",
               revision: "9666cedebb7527bd972627ec01929349",
            },
            {
               url: "static/styles/themes/dark_magic_girl.css",
               revision: "f82f3d26069b343ebeb13993e63a4d27",
            },
            {
               url: "static/styles/themes/dark_note.css",
               revision: "4e6331d0cd0ea7d738e73eec62dacff9",
            },
            {
               url: "static/styles/themes/dark.css",
               revision: "49b02423c560a504e08e178cbdfd3911",
            },
            {
               url: "static/styles/themes/darling.css",
               revision: "bf26d08c0c9dc85cbb3d4ab3c59ac2d4",
            },
            {
               url: "static/styles/themes/deku.css",
               revision: "18a2c733e7d299c13cbed10e24c82d61",
            },
            {
               url: "static/styles/themes/desert_oasis.css",
               revision: "0c5b4beadf3546b441aef910eda7f3be",
            },
            {
               url: "static/styles/themes/dev.css",
               revision: "3395870751c4e2d0c07463e819d3a0a0",
            },
            {
               url: "static/styles/themes/diner.css",
               revision: "15a985f66530e34d85939f21511895af",
            },
            {
               url: "static/styles/themes/dino.css",
               revision: "ce83a5bf2ca628c5a2aa46bb36366888",
            },
            {
               url: "static/styles/themes/dmg.css",
               revision: "768402151035d71e4bc08fae0efeac1c",
            },
            {
               url: "static/styles/themes/dollar.css",
               revision: "27345980dd974177a7fcb92c82a1b405",
            },
            {
               url: "static/styles/themes/dots.css",
               revision: "ae2dbc21caddab603d5259f0febae0c1",
            },
            {
               url: "static/styles/themes/dracula.css",
               revision: "40ff281d19ae9558a2b574c9668026f5",
            },
            {
               url: "static/styles/themes/drowning.css",
               revision: "f800c28745e7fad3e926dded11d62d2f",
            },
            {
               url: "static/styles/themes/dualshot.css",
               revision: "58b41031642fbbdd39c979c6dd5f40fa",
            },
            {
               url: "static/styles/themes/earthsong.css",
               revision: "ae71099a6e81422493a4c9a7ae44834b",
            },
            {
               url: "static/styles/themes/evil_eye.css",
               revision: "2a2ee59e8925938a62ba3f8c94a8a2b1",
            },
            {
               url: "static/styles/themes/ez_mode.css",
               revision: "2cf99d28b3de29e157189fc08d2baa0d",
            },
            {
               url: "static/styles/themes/fire.css",
               revision: "ec10f053652c48013fe1a87fcb018a77",
            },
            {
               url: "static/styles/themes/fledgling.css",
               revision: "09865be4fdd376b44c1dc33d371c716a",
            },
            {
               url: "static/styles/themes/fleuriste.css",
               revision: "05ed60542edf49c4599be3e46d4bf97e",
            },
            {
               url: "static/styles/themes/froyo.css",
               revision: "92dff0c962f98f7ecf8b9da777f1e6fe",
            },
            {
               url: "static/styles/themes/frozen_llama.css",
               revision: "fe1d18920a359fdbda939455e27f0025",
            },
            {
               url: "static/styles/themes/fruit_chew.css",
               revision: "70a01d74ae327006428332415c6f4ad2",
            },
            {
               url: "static/styles/themes/fundamentals.css",
               revision: "beaf97eea3713880c2c42b5f33aaae4b",
            },
            {
               url: "static/styles/themes/future_funk.css",
               revision: "8540a94a8b822ddf657e3eb9b8138fc7",
            },
            {
               url: "static/styles/themes/godspeed.css",
               revision: "e4db7bd636b4d8fd27e9d391c5822e21",
            },
            {
               url: "static/styles/themes/graen.css",
               revision: "5e25c7581a022f7267295d2418311039",
            },
            {
               url: "static/styles/themes/grand_prix.css",
               revision: "b9fbdd9887693ce8380fa15b2230a599",
            },
            {
               url: "static/styles/themes/gruvbox_dark.css",
               revision: "18d562f71ef415836d871295bcfd7969",
            },
            {
               url: "static/styles/themes/gruvbox_light.css",
               revision: "fcf703f8b83ead06a96252ea4adddee4",
            },
            {
               url: "static/styles/themes/hammerhead.css",
               revision: "42e767b980422f16577bf070b988a3e7",
            },
            {
               url: "static/styles/themes/hanok.css",
               revision: "c50656520634f56d752b95e71b46d061",
            },
            {
               url: "static/styles/themes/hedge.css",
               revision: "a6b176661609d478b83e7b16668f8d8d",
            },
            {
               url: "static/styles/themes/honey.css",
               revision: "77d961ea469ef8fbf1a87c3b6d7301d2",
            },
            {
               url: "static/styles/themes/horizon.css",
               revision: "9440ed2b1c11619e581086701d53b5f3",
            },
            {
               url: "static/styles/themes/husqy.css",
               revision: "57c0345becee2edf70b38fe1b3cf0af7",
            },
            {
               url: "static/styles/themes/iceberg_dark.css",
               revision: "dc897069b7637f5fb537015f966ce192",
            },
            {
               url: "static/styles/themes/iceberg_light.css",
               revision: "1f58168a10f13bba5e003228999fded3",
            },
            {
               url: "static/styles/themes/ishtar.css",
               revision: "f752af8f60ee27a65d7bf3bb181c9077",
            },
            {
               url: "static/styles/themes/iv_clover.css",
               revision: "319b569a17392b4aa77839f89423fda3",
            },
            {
               url: "static/styles/themes/iv_spade.css",
               revision: "99c593e4936a8ee9f9dd17b502a43b53",
            },
            {
               url: "static/styles/themes/joker.css",
               revision: "1c347829cc18ca55d6befd00c583d666",
            },
            {
               url: "static/styles/themes/laser.css",
               revision: "4133e7fb90d2d3ce1438f0ab72a0946f",
            },
            {
               url: "static/styles/themes/lavender.css",
               revision: "6e8516d19cc77f880da3dd15ffb0251c",
            },
            {
               url: "static/styles/themes/leather.css",
               revision: "f799c9a2e896e7101d702b03636f5196",
            },
            {
               url: "static/styles/themes/lil_dragon.css",
               revision: "ab0a3dce818760aaa4a5f3fb9916aaef",
            },
            {
               url: "static/styles/themes/lime.css",
               revision: "5f276b23948579c4a91f10da459419bf",
            },
            {
               url: "static/styles/themes/luna.css",
               revision: "3a2eca66ab9ade393129804966514a9c",
            },
            {
               url: "static/styles/themes/magic_girl.css",
               revision: "2ac102c9bd93c2fbbd6b42e962337a42",
            },
            {
               url: "static/styles/themes/mashu.css",
               revision: "57679c7085ec45aa7aaa2920bbebb1e7",
            },
            {
               url: "static/styles/themes/matcha_moccha.css",
               revision: "d429e3a58084a3fb1b7f070e8eb6f53d",
            },
            {
               url: "static/styles/themes/material.css",
               revision: "ca8623b9862275e678ab5e778255e869",
            },
            {
               url: "static/styles/themes/matrix.css",
               revision: "570750c743ff8c4b608180281a645c98",
            },
            {
               url: "static/styles/themes/menthol.css",
               revision: "4480b2b6a3ceeaa19e046dcc9af9b413",
            },
            {
               url: "static/styles/themes/metaverse.css",
               revision: "019f9853d5b68eec594525d778b606dd",
            },
            {
               url: "static/styles/themes/metropolis.css",
               revision: "0b959e66c54fb418b918e18e505f118a",
            },
            {
               url: "static/styles/themes/mexican.css",
               revision: "e55341e850fdda6c85498a12b60ec6a1",
            },
            {
               url: "static/styles/themes/miami_nights.css",
               revision: "e3eef491b9d861e05bec432c3e29fe8e",
            },
            {
               url: "static/styles/themes/miami.css",
               revision: "3fc0034c08ccbfea094a6be823fad9c0",
            },
            {
               url: "static/styles/themes/midnight.css",
               revision: "f6e387ec915464df9fe0f3f83cba0be4",
            },
            {
               url: "static/styles/themes/milkshake.css",
               revision: "13274278f92b64365c6b8ad96b6dd95d",
            },
            {
               url: "static/styles/themes/mint.css",
               revision: "d8304fef19851d0f9381d424aaa60bce",
            },
            {
               url: "static/styles/themes/mizu.css",
               revision: "61154f6f4c53016a7f72672897208bd1",
            },
            {
               url: "static/styles/themes/modern_dolch_light.css",
               revision: "554e92380ab2be182fa9da74d0e24fb7",
            },
            {
               url: "static/styles/themes/modern_dolch.css",
               revision: "eb8d72f36b33d7c68ad93310ef56993f",
            },
            {
               url: "static/styles/themes/modern_ink.css",
               revision: "96e31530770d710207a46648d77df326",
            },
            {
               url: "static/styles/themes/monokai.css",
               revision: "25952eed74e1a856d3303b6188792f6b",
            },
            {
               url: "static/styles/themes/moonlight.css",
               revision: "0c12c2880265661cb33d701ceb2da9da",
            },
            {
               url: "static/styles/themes/mountain.css",
               revision: "d35609a7f3ce84db6ab5a2e2a3abe97d",
            },
            {
               url: "static/styles/themes/mr_sleeves.css",
               revision: "5d1d4bf4f298238a846349c53a0181a6",
            },
            {
               url: "static/styles/themes/ms_cupcakes.css",
               revision: "5ae2928cbbe9ff67a67a616d78b3417e",
            },
            {
               url: "static/styles/themes/muted.css",
               revision: "7776c6f3d47d8277bf4ccb190dc7b559",
            },
            {
               url: "static/styles/themes/nautilus.css",
               revision: "775c956501a1d997611bdcbba097ea37",
            },
            {
               url: "static/styles/themes/nebula.css",
               revision: "b2d27f0ac8f2906e66b281f7338f5c3c",
            },
            {
               url: "static/styles/themes/night_runner.css",
               revision: "9803627e615066d13ff6cc897ba8491d",
            },
            {
               url: "static/styles/themes/nord_light.css",
               revision: "4d87879ce309cab94fc2c736f1fa74e7",
            },
            {
               url: "static/styles/themes/nord.css",
               revision: "b334f75061a20339d253bbe033e0d078",
            },
            {
               url: "static/styles/themes/norse.css",
               revision: "c9985f8dabee2d0079d7d87a3eabee47",
            },
            {
               url: "static/styles/themes/oblivion.css",
               revision: "ccad79ba6c0614f05d5df6faee4311ec",
            },
            {
               url: "static/styles/themes/olive.css",
               revision: "147891b2512e1aff94ee1c193d7e756c",
            },
            {
               url: "static/styles/themes/olivia.css",
               revision: "829c0ad429485f3959bfbbfbc3b87636",
            },
            {
               url: "static/styles/themes/onedark.css",
               revision: "4eee72507dddd412811838d32cb1248c",
            },
            {
               url: "static/styles/themes/our_theme.css",
               revision: "16aa19d11ff2548da1745d37c065946e",
            },
            {
               url: "static/styles/themes/paper.css",
               revision: "7a22f4f05789603af1873bbd6c04ec76",
            },
            {
               url: "static/styles/themes/passion_fruit.css",
               revision: "9746ee73f18da1898d161eac324445f9",
            },
            {
               url: "static/styles/themes/pastel.css",
               revision: "f009f97c207549348baba8d8a3bd47ad",
            },
            {
               url: "static/styles/themes/peach_blossom.css",
               revision: "45c4bbe9657ee9321a40fb012518ef4b",
            },
            {
               url: "static/styles/themes/peaches.css",
               revision: "b1b396643609042533d72a7228cf8107",
            },
            {
               url: "static/styles/themes/pink_lemonade.css",
               revision: "eafd9a9a292ce69b80c23907cb6dba82",
            },
            {
               url: "static/styles/themes/pulse.css",
               revision: "9184f23f0cce23663d260a2546eb1521",
            },
            {
               url: "static/styles/themes/purpurite.css",
               revision: "1867a70d3de23035d99f79b7fb44de2d",
            },
            {
               url: "static/styles/themes/red_dragon.css",
               revision: "c8ecc7ffbfbcc0288e2ddd3ac56fa00a",
            },
            {
               url: "static/styles/themes/red_samurai.css",
               revision: "f9398fad7e1f96918583103440ccc924",
            },
            {
               url: "static/styles/themes/repose_dark.css",
               revision: "6e79b89a79f87fd6d3d5aaafae881c63",
            },
            {
               url: "static/styles/themes/repose_light.css",
               revision: "39d4b072cb972a1d8ecaa1fd58268ee2",
            },
            {
               url: "static/styles/themes/retro.css",
               revision: "83408bf83ada72f3f3f29a329e7dcbe3",
            },
            {
               url: "static/styles/themes/retrocast.css",
               revision: "a44873e1050e9996c595412d1d7daa5b",
            },
            {
               url: "static/styles/themes/rgb.css",
               revision: "7a60fee68322a50693aea06d05ee54e9",
            },
            {
               url: "static/styles/themes/rose_pine_dawn.css",
               revision: "e8cfe95795df537d4011fb774b67e683",
            },
            {
               url: "static/styles/themes/rose_pine_moon.css",
               revision: "26baef95b005f2cbd693d8c849f8b21f",
            },
            {
               url: "static/styles/themes/rose_pine.css",
               revision: "9317683e6fbf45c4fabbed252b8f1c6c",
            },
            {
               url: "static/styles/themes/rudy.css",
               revision: "e7b2d9cfd31a3b6c5b550210d3a10ed6",
            },
            {
               url: "static/styles/themes/ryujinscales.css",
               revision: "1a0e1809caf63a37b18a4a198452103e",
            },
            {
               url: "static/styles/themes/serika_dark.css",
               revision: "01e39a1bed361b72b778c51835617c4d",
            },
            {
               url: "static/styles/themes/serika.css",
               revision: "88ee774013205d6d4139f5722dd6cb1a",
            },
            {
               url: "static/styles/themes/sewing_tin_light.css",
               revision: "595e4e9876dc944710cc0d2c2ca61bd1",
            },
            {
               url: "static/styles/themes/sewing_tin.css",
               revision: "1f1457c4b73bcd1a328bae0678e4713b",
            },
            {
               url: "static/styles/themes/shadow.css",
               revision: "834d0ae3a265043db1d3bd25cdf93732",
            },
            {
               url: "static/styles/themes/shoko.css",
               revision: "a304cbb5ac2ed602ac5567644d04a92c",
            },
            {
               url: "static/styles/themes/slambook.css",
               revision: "f033cddaa365b5388c04595a09f0643a",
            },
            {
               url: "static/styles/themes/snes.css",
               revision: "92dbb80c33ddc10ad94a0de1c4d07f14",
            },
            {
               url: "static/styles/themes/soaring_skies.css",
               revision: "48a2c929401878e5d79454d4dd9c7fc3",
            },
            {
               url: "static/styles/themes/solarized_dark.css",
               revision: "86fe530a2322c4925278263f2074e8df",
            },
            {
               url: "static/styles/themes/solarized_light.css",
               revision: "f6e18bf4ed63186a6b7ed996d197c5bf",
            },
            {
               url: "static/styles/themes/sonokai.css",
               revision: "86fad53b3aeefd254091bfcd2c8988a8",
            },
            {
               url: "static/styles/themes/stealth.css",
               revision: "c5d3312f5daae2a8ca68aad6d1de5c81",
            },
            {
               url: "static/styles/themes/strawberry.css",
               revision: "82dbee36a15dd47bcc4867c70bf27115",
            },
            {
               url: "static/styles/themes/striker.css",
               revision: "bc3e6898848b311adffb748c2d18802d",
            },
            {
               url: "static/styles/themes/superuser.css",
               revision: "87df78f57af6c3145e2588db5930fb6e",
            },
            {
               url: "static/styles/themes/sweden.css",
               revision: "460a6c46c4fc621fe733f8a098ec048d",
            },
            {
               url: "static/styles/themes/taro.css",
               revision: "fdd4769779eec2d062444d32e7649169",
            },
            {
               url: "static/styles/themes/terminal.css",
               revision: "cb3889c5cf138c7c58df0a19fe0c5589",
            },
            {
               url: "static/styles/themes/terra.css",
               revision: "b1ae2a44a203b1dfbe95923d1663d2a1",
            },
            {
               url: "static/styles/themes/terror_below.css",
               revision: "1d30258e0688080418c4201ab7bd2302",
            },
            {
               url: "static/styles/themes/tiramisu.css",
               revision: "a8a91334ac7a07e8adcbe6e6aa9e81da",
            },
            {
               url: "static/styles/themes/trackday.css",
               revision: "c342916b4460b2574bcb2faf26bcfd13",
            },
            {
               url: "static/styles/themes/trance.css",
               revision: "96d02c64faef9019ecdf634959bb9dbe",
            },
            {
               url: "static/styles/themes/tron_orange.css",
               revision: "5b4e91cdbda982cb1a735648d8cbbed4",
            },
            {
               url: "static/styles/themes/vaporwave.css",
               revision: "20784e2768f5dc9d0767e05386f6cbd1",
            },
            {
               url: "static/styles/themes/viridescent.css",
               revision: "f60f0c010e681c7d8e13bf04491f8377",
            },
            {
               url: "static/styles/themes/voc.css",
               revision: "9d4c89c0618eccdf9bebbcb51ed0bd1c",
            },
            {
               url: "static/styles/themes/vscode.css",
               revision: "57723e0686b8fdeda9e78ed737c833c5",
            },
            {
               url: "static/styles/themes/watermelon.css",
               revision: "7a4e49948da7d373ae9eed52b919451f",
            },
            {
               url: "static/styles/themes/wavez.css",
               revision: "c5edc3e8a1013cf975c4819f884667ff",
            },
            {
               url: "static/styles/themes/witch_girl.css",
               revision: "ec6d597c381ced391d42583081fee1e3",
            },
         ],
         { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
      );
});
//# sourceMappingURL=sw.js.map
