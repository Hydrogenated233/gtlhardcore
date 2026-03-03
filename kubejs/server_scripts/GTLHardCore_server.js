// priority: -999
const [ULV, LV, MV, HV, EV, IV, LuV, ZPM, UV, UHV, UEV, UIV, UXV, OpV, MAX] = GTValues.VA;
ServerEvents.recipes(event => {
	//移除配方
	// 输出
	let output = [
	]
	output.forEach((item) => {
		event.remove({ output: item })
	})
	// 输入
	let input = [
	]
	input.forEach((item) => {
		event.remove({ input: item })
	})

	// 配方类型
	let recipeType = [

	]
	recipeType.forEach((type) => {
		event.remove({ type: type })
	})
	//id
	let recipeId = [
		'gtceu:shapeless/dust_bronze',
		'gtceu:smelting/dust_bronze__demagnetize_from_dust',
		'gtceu:rubber_plate',//移除不掉,但是会优先执行?
		'gtceu:shaped/casing_primitive_bricks'
	]
	recipeId.forEach((id) => {
		event.remove({ id: id })
	})
	event.remove({type:'gtceu:primitive_blast_furnace',output:'gtceu:steel_block'})
	//青铜锭
	//1.修改青铜粉配方
	//2.注册新物品实现分段
	//    2.1.熔炉
	//    2.2.锻造锤有序
	//    2.3.高炉
	event.shaped(Item.of('gtceu:bronze_dust', 4), [
		'S C',
		'C C',
		' T '
	], {
		S: 'gtceu:tin_ingot',
		C: 'minecraft:copper_ingot',
		T: '#forge:tools/hammers'
	}).id("gtlhardcore:bronze_dust")
	event.smelting(
		'gtlhardcore:bronze_billet_1',
		'gtceu:bronze_dust'
	).id('gtlhardcore:bronze_dust_to_stage1')
	event.shaped(
		'gtlhardcore:bronze_billet_2',
		[
			' H ',
			' D ',
			'   '
		],
		{
			H: '#forge:tools/hammers',
			D: 'gtlhardcore:bronze_billet_1',
		}
	).id("gtlhardcore:bronze_stage1_to_stage2")
	event.blasting(
		'gtceu:bronze_ingot',
		'gtlhardcore:bronze_billet_2'
	).id('gtlhardcore:bronze_stage2_to_ingot')
	//黏性树脂
	event.recipes.gtceu.compressor('gtlhardcore:sticky_resin_hack')
        .itemInputs('gtceu:sticky_resin')
        .itemOutputs('gtlhardcore:sticky_resin')
        .duration(100)
        .EUt(2);
	event.recipes.gtceu.compressor('gtlhardcore:sticky_resin_back')
        .itemInputs('gtlhardcore:sticky_resin')
        .itemOutputs('gtceu:sticky_resin')
        .duration(1)
        .EUt(2);
	//钢
	event.replaceOutput({type:'gtceu:primitive_blast_furnace'},'gtceu:steel_ingot','gtlhardcore:hot_steel_billet_1');
	event.shaped(
		"gtlhardcore:steel_billet_2",
		[
			' H ',
			' D ',
			'   '
		],
		{
			H: '#forge:tools/hammers',
			D: 'gtlhardcore:hot_steel_billet_1',
		}
	).id("gtlhardcore:steel_stage1_to_stage2")
	let input2=[
		'2x minecraft:coal',
		'2x gtceu:coal_dust',
		'2x minecraft:charcoal',
		'2x gtceu:charcoal_dust',
		'gtceu:coke_gem',
		'gtceu:coke_dust'
	]
	const getAfterColon = str => (typeof str === 'string' ? str.slice(str.lastIndexOf(':') + 1) : '');
	input2.forEach((item)=>{
		event.recipes.gtceu.primitive_blast_furnace("gtlhardcore:steel_stage2_to_stage3"+"_"+getAfterColon(item))
				.itemInputs("gtlhardcore:steel_billet_2",item)
				.itemOutputs("gtlhardcore:hot_steel_billet_3",'2x gtceu:tiny_dark_ash_dust')
				.duration(1000)
	})
	event.shaped(
		"gtceu:steel_ingot",
		[
			' H ',
			' D ',
			'   '
		],
		{
			H: '#forge:tools/hammers',
			D: "gtlhardcore:hot_steel_billet_3",
		}
	).id("gtlhardcore:steel_stage3_to_ingot")
	//土高炉相关
	event.shaped(
		"gtlhardcore:concrete_in_buckets",
		[
			'CBQ',
			'CWS',
			' Y '
		],
		{
			Q: 'gtceu:quartz_sand_dust',
			S: 'gtceu:stone_dust',
			C: 'gtceu:calcite_dust',
			Y: 'gtceu:clay_dust',
			W: 'minecraft:water_bucket',
			B: 'minecraft:bucket'
		}
	).id("gtlhardcore:concrete")
	event.shaped(
		'gtceu:firebricks',
		[
			'FGF',
			'FCF',
			'FGF'
		],
		{
			G: 'gtceu:gypsum_dust',
			C: "gtlhardcore:concrete_in_buckets",
			F: 'gtceu:firebrick'
		}
	).id("gtlhardcore:casing_primitive_bricks")
});
