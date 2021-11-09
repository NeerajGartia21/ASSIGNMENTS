const flattenJson = (obj = {}, output = {}, extraKey = '') => {
   for(key in obj){
      if(typeof obj[key] !== 'object'){
         output[extraKey + key] = obj[key];
      }else{
         flattenJson(obj[key], output, `${extraKey}${key}.`);
      };
   };
   return output;
};

const get2DArray = (obj = {}, output =[], extraKey = '',depth=1,parent="root") => {
   for(key in obj){
      if(typeof obj[key] !== 'object'){
         output.push([depth,parent,key,typeof(obj[key]),obj[key]]);
      }else if(obj[key] instanceof Array){
         output.push([depth,parent,key,typeof(obj[key]),obj[key]]);
      }else{
         output.push([depth,parent,key,typeof(obj[key])]);
         parent=key;
         depth++
         get2DArray(obj[key], output,extraKey,depth,parent);
      };
   };
   return output;
};

document.getElementById('get2DArray').addEventListener('click',function(){
       const output=get2DArray(JSON.parse(document.getElementById('input').value));
       document.getElementById('output').innerHTML=`<tr>
       <th>Depth</th>
       <th>Parent</th>
       <th>Entity</th>
       <th>Type</th>
       <th>Value</th>
   </tr>`;
       output.forEach(element=>{
          if(element[4]){
            document.getElementById('output').innerHTML+=`<tr>
            <th>${element[0]}</th>
            <th>${element[1]}</th>
            <th>${element[2]}</th>
            <th>${element[3]}</th>
            <th>${element[4]}</th>
          </tr>`;
          }else{
            document.getElementById('output').innerHTML+=`<tr>
            <th>${element[0]}</th>
            <th>${element[1]}</th>
            <th>${element[2]}</th>
            <th>${element[3]}</th>
          </tr>`;
          }
       })
})


