var twoSum = function(nums, target) {
    let result = [];
    let numsOrder = nums;
    numsOrder.sort((a,b) => a-b);
    console.log(nums);
    for(let x = 0 ; x <numsOrder.length ; x++ ){
        let numsTarget = target-numsOrder[x];
        numsOrder = numsOrder.filter(x => x <= numsTarget );
        if(numsOrder[numsOrder.length-1] === numsTarget){
            break;
        };
    };
    console.log(numsOrder[0])
    let firstarget = nums.indexOf(numsOrder[0]);
    console.log(firstarget);
    console.log(nums)
    let secondtarget = nums.indexOf(numsOrder[numsOrder.length-1]);
    result.push(firstarget);
    result.push(secondtarget);
    return result
};
//console.log(twoSum([2,7,11,15],9));
console.log(twoSum([3,2,4],6));
//console.log(twoSum([3,3],6))