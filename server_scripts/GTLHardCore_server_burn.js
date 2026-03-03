//类热锭烧伤实现

//此处添加物品扩展
const HOT_ITEMS = [
	"gtlhardcore:bronze_billet_1",
	"gtlhardcore:bronze_billet_2",
	"gtlhardcore:bronze_billet_3"
];

const cooldown = new Map();

PlayerEvents.inventoryChanged(event => {
	let item = event.getItem();
	if (HOT_ITEMS.includes(item.getId())) {
		event.player.tell("§c⚠️炽热的物品会烧伤你！");
	}
});

PlayerEvents.tick(event => {
	const { player, level } = event;
	//不足一秒直接跳出
	if (level.time % 20 !== 0) return;
	const now = Date.now();
	const last = cooldown.get(player.getUuid()) || 0;
	let hasHot = false;
	//判断有没有数组中的物品
	for (let item of player.getInventory().getAllItems()) {
		if (HOT_ITEMS.includes(item.getId())) {
			hasHot = true;
			break;
		}
	}
	//间隔1秒
	if (hasHot && now - last >= 1000) {
		//指令伤害
		player.runCommandSilent(`damage @s 2 on_fire`);
		cooldown.set(player.getUuid(), now);
	}
});

PlayerEvents.loggedOut(event => {
	cooldown.delete(event.player.getUuid());
});