
Meteor.subscribe('cycles-recent', moment().subtract(1, 'hours').format("YYYY-MM-DD HH:mm:ss.SSS"))
   Meteor.subscribe('parts');
Meteor.subscribe('machines');

Template.countdownbar.helpers({

 percent: function(){
    num= Machines.find().fetch().pop().cellnum;
     
    month=moment().format("MM")
   
      timestamp= moment().format("YYYY-MM-DD 08:59:00.000")
   num= Machines.find().fetch().pop().cellnum;
     //figure out cycle time
        start =Cycles.find({PressNumber: num, AutoStatus:'1', CycleTimeStamp: {$gte: moment(Parts.find({press:num, month:month}).fetch().pop().timestamp.toString()).subtract(75,'seconds').format("YYYY-MM-DD HH:mm:ss.SSS")}}).fetch().pop().CycleTimeStamp
       
        prev =Cycles.find({PressNumber: num, AutoStatus:'1',CycleTimeStamp: {$gt: moment(Parts.find({press:num, month:month}).fetch().pop().timestamp.toString()).subtract(100,'seconds').format("YYYY-MM-DD HH:mm:ss.SSS"), $lt: moment(start.toString()).format("YYYY-MM-DD HH:mm:ss.SSS")}}).fetch().pop().CycleTimeStamp
        
        //I should always compare with the most recently submitted job
        
            cycletimeH=Parts.find({press:num, month:month}).fetch().pop().cycletimeH
            cycletimeP=Parts.find({press:num, month:month}).fetch().pop().cycletimeP
            cycletimeQ=Parts.find({press:num, month:month}).fetch().pop().cycletimeQ
           
            if (cycletimeH>0 )
            {
              cycletime=cycletimeH
             
            }

            if ((cycletimeH<=0 || cycletimeH=="") && cycletimeP> 0)
            {
              cycletime=cycletimeP
              
            }
            if ((cycletimeH<=0 || cycletimeH=="") && (cycletimeP<=0 || cycletimeP=="") && cycletimeQ!=0)
            {
              cycletime=cycletimeQ
              
            }
           


startseconds=moment(start).format("ss.SSS")
startminutes=moment(start).format("mm")
startseconds=Number(startseconds)+ Number(startminutes)*60
prevseconds=moment(prev).format("ss.SSS")
prevminutes=moment(prev).format("mm")
prevseconds=Number(prevseconds) + Number(prevminutes)*60
cycletimeNow= startseconds-prevseconds
// console.log("This is the cycletime" + cycletime)
 piecesPerHour= (3600/cycletimeNow) * Parts.find({press:num, month:month}).fetch().pop().cavitation  //this is the pieces per hour
          amountMade=Cycles.find({PressNumber: num, AutoStatus:'1', CycleTimeStamp: {$gte: moment(Parts.find({press:num, month:month}).fetch().pop().timestamp.toString()).subtract(75,'seconds').format("YYYY-MM-DD HH:mm:ss.SSS")}}).count()* Parts.find({press:num, month:month}).fetch().pop().cavitation
          
        hoursRemaining=(Parts.find({press:num, month:month}).fetch().pop().quantity - amountMade)/piecesPerHour
 total=Parts.find({press:num, month:month}).fetch().pop().quantity/piecesPerHour

    if (hoursRemaining >24)
    {
      hoursRemaining=24
    }
     if (hoursRemaining <0)
    {
      hoursRemaining=0
    }
          percent=hoursRemaining/24
          percent=percent*100
                 //I need the percent to be based out of 24 hours
                 //basically divide the hours remaining by 24
                 //if the hours remaining is over 24 then set it equal to 24

         if (percent<=0)
          {

           percent=0;
          }
          return percent;
   },
hour: function(){
   num= Machines.find().fetch().pop().cellnum;
     
    month=moment().format("MM")
   
      timestamp= moment().format("YYYY-MM-DD 08:59:00.000")
   num= Machines.find().fetch().pop().cellnum;
     //figure out cycle time
        start =Cycles.find({PressNumber: num, AutoStatus:'1', CycleTimeStamp: {$gte: moment(Parts.find({press:num, month:month}).fetch().pop().timestamp.toString()).subtract(75,'seconds').format("YYYY-MM-DD HH:mm:ss.SSS")}}).fetch().pop().CycleTimeStamp
       
        prev =Cycles.find({PressNumber: num, AutoStatus:'1',CycleTimeStamp: {$gt: moment(Parts.find({press:num, month:month}).fetch().pop().timestamp.toString()).subtract(100,'seconds').format("YYYY-MM-DD HH:mm:ss.SSS"), $lt: moment(start.toString()).format("YYYY-MM-DD HH:mm:ss.SSS")}}).fetch().pop().CycleTimeStamp
        
        //I should always compare with the most recently submitted job
        
            cycletimeH=Parts.find({press:num, month:month}).fetch().pop().cycletimeH
            cycletimeP=Parts.find({press:num, month:month}).fetch().pop().cycletimeP
            cycletimeQ=Parts.find({press:num, month:month}).fetch().pop().cycletimeQ
           
            if (cycletimeH>0 )
            {
              cycletime=cycletimeH
             
            }

            if ((cycletimeH<=0 || cycletimeH=="") && cycletimeP> 0)
            {
              cycletime=cycletimeP
              
            }
            if ((cycletimeH<=0 || cycletimeH=="") && (cycletimeP<=0 || cycletimeP=="") && cycletimeQ!=0)
            {
              cycletime=cycletimeQ
              
            }
           


startseconds=moment(start).format("ss.SSS")
startminutes=moment(start).format("mm")
startseconds=Number(startseconds)+ Number(startminutes)*60
prevseconds=moment(prev).format("ss.SSS")
prevminutes=moment(prev).format("mm")
prevseconds=Number(prevseconds) + Number(prevminutes)*60
cycletimeNow= startseconds-prevseconds
// console.log("This is the cycletime" + cycletime)
 piecesPerHour= (3600/cycletimeNow) * Parts.find({press:num, month:month}).fetch().pop().cavitation  //this is the pieces per hour
          amountMade=Cycles.find({PressNumber: num, AutoStatus:'1', CycleTimeStamp: {$gte: moment(Parts.find({press:num, month:month}).fetch().pop().timestamp.toString()).subtract(75,'seconds').format("YYYY-MM-DD HH:mm:ss.SSS")}}).count()* Parts.find({press:num, month:month}).fetch().pop().cavitation
          
        hoursRemaining=(Parts.find({press:num, month:month}).fetch().pop().quantity - amountMade)/piecesPerHour

         
         if (hoursRemaining <=0)
         {
          hoursRemaining=0;
         }
         //convert the hours remaining to 

        
        //change percent to be how many hours out of 24 hours
        return hoursRemaining
   }


  })



