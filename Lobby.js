class Lobby extends Phaser.Scene{
    
    constructor(){
        super({key:"Lobby"});
    }
    preload ()
        {
            this.load.spritesheet('floor', 'assets/floors.png', { frameWidth: 32, frameHeight: 32 } );
            this.load.spritesheet('laptop', 'assets/laptop.png', { frameWidth: 32, frameHeight: 32 });
            this.load.image('sketch', 'assets/wiki-sketch.png', {frameWidth: 800, frameHeight: 600});
            this.load.spritesheet('dude', 'assets/Spieler.png', { frameWidth: 30, frameHeight: 32 });
            this.load.spritesheet('sekretaer', 'assets/Sekretaerin.png', { frameWidth: 28, frameHeight: 32 });
            this.load.image('dialog', 'assets/dialogbox.png', {frameWidth: 1024, frameHeight: 576});
            this.load.spritesheet('LobbyDesk', 'assets/BrownWalls.png', {frameWidth: 48, frameHeight: 16});
            this.load.image('Tuer', 'assets/Tuer.png', {frameWidth: 31, frameHeight: 35});
            this.load.image('Gelaender', 'assets/gelaender.png', {frameWidth: 532, frameHeight: 13});
            this.load.image('Welcome1', 'assets/Dialoge/Welcome1.png', {frameWidth: 379, frameHeight: 171});
            this.load.image('Welcome2', 'assets/Dialoge/Welcome2.png', {frameWidth: 379, frameHeight: 171});
            this.load.image('Welcome3', 'assets/Dialoge/Welcome3.png', {frameWidth: 379, frameHeight: 171});
            this.load.image('Welcome4', 'assets/Dialoge/Welcome4.png', {frameWidth: 379, frameHeight: 171});
            this.load.image('Empfang1', 'assets/Dialoge/Empfang1.png', {frameWidth: 379, frameHeight: 171});
            this.load.image('Empfang2', 'assets/Dialoge/Empfang2.png', {frameWidth: 379, frameHeight: 171});
            this.load.image('Empfang3', 'assets/Dialoge/Empfang3.png', {frameWidth: 379, frameHeight: 171});
            this.load.image('Empfang4', 'assets/Dialoge/Empfang4.png', {frameWidth: 379, frameHeight: 171});

        }

    create ()
        {
            this.user = "twenska";
            var border = this.physics.add.staticGroup();
            var floor = this.physics.add.staticGroup();
            var LobbyDesk = this.physics.add.staticGroup();
            var stairs = this.physics.add.staticGroup();

            this.DialogBoot = this.physics.add.group();
            this.DialogEmpfang = this.physics.add.group();
            this.DialogEmpfangDone = false;

            this.inDialog = false;
            this.actualDialog = undefined;
            this.actualTask = undefined;

            this.score = 0;
            document.getElementById("Punkte").innerHTML="Punkte: "+this.score;
            document.getElementById("Level").innerHTML="Die Lobby";
            document.getElementById("User").innerHTML="User: "+this.user;
            document.getElementById("Hinweis").innerHTML = "In Dialogen kannst du mit der Interaktionstaste weiterblättern!\nDie Dialoge enthalten oft wichtige Informationen. Du solltest sie also aufmerksam lesen.\n Hast du einen Dialog nicht richtig gelesen kannst du ihn mit der Interaktionstaste erneut starten!";
            //boden
            for(var i=0;i<=game.config.width;i+=32){
                for(var t=0;t<=game.config.height;t+=32){
                    floor.create(i,t,'floor',69);//53
                } 
            }
            
            stairs.create(75,32,'floor',102);
            stairs.create(75,64,'floor',102);
            stairs.create(75,96,'floor',102);
            stairs.create(107,32,'floor',102);
            stairs.create(107,64,'floor',102);
            stairs.create(107,96,'floor',102);

            this.gelaenderL = this.physics.add.image(59, 60, 'Gelaender').setAngle(90).setScale(0.2);
            this.gelaenderR = this.physics.add.image(123, 60, 'Gelaender').setAngle(90).setScale(0.2);
            this.makeImmovable(this.gelaenderL);
            this.makeImmovable(this.gelaenderR);

            LobbyDesk.create(256,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(352,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(444,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(536,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(628,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(208,128, 'LobbyDesk',24).setScale(2).setAngle(90);
            LobbyDesk.create(676,128, 'LobbyDesk',24).setScale(2).setAngle(90);
            LobbyDesk.create(676,32, 'LobbyDesk',24).setScale(2).setAngle(90);
        
            //this.physics.add.sprite(0, 0, 'floor', 5);
            //left wall
            for(var i = 0; i<=game.config.height;i+=32){
                border.create(16,i, 'floor',5);
            }
            //right wall
            for(var i = 16; i<=game.config.height;i+=32){
                border.create(game.config.width-16,i, 'floor',5);
            }
            // top wall
            for(var i = 0; i<=game.config.width;i+=32){
                border.create(i,16, 'floor',5);
            }
            //bottom wall
            for(var i = 0; i<=game.config.width;i+=32){
                border.create(i,game.config.height-16, 'floor',5);
            }

            this.player = this.physics.add.sprite(200, 460, 'dude',5).setScale(1.2);
            this.sekretaer = this.physics.add.sprite(420,130, 'sekretaer',5).setScale(1.2);
            this.makeImmovable(this.sekretaer);

            this.laptop = this.physics.add.sprite(470,90,'laptop',3);
            this.door = this.physics.add.image(730, 13, 'Tuer');

            this.Dialog = this.physics.add.image(420, 520, 'dialog').setScale(0.65);
            this.Dialog.setVisible(false);

            this.physics.add.collider(this.player, border);
            this.physics.add.collider(this.player, LobbyDesk);
            this.physics.add.collider(this.player, this.gelaenderL);
            this.physics.add.collider(this.player, this.gelaenderR);
            this.physics.add.collider(this.player, this.sekretaer);
            this.physics.add.collider(this.player, this.laptop);
            
            //  Our player animations, turning, walking left and walking right.
            this.anims.create({
                key: 'left',
                frames: [ { key: 'dude', frame: 3 },{ key: 'dude', frame: 6 },{ key: 'dude', frame: 9 } ],
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [ { key: 'dude', frame: 0 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: [ { key: 'dude', frame: 1 },{ key: 'dude', frame: 4 },{ key: 'dude', frame: 7 } ],
                //frames: this.anims.generateFrameNumbers('dude', { 1,4,7 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'up',
                frames: [ { key: 'dude', frame: 2 },{ key: 'dude', frame: 0 },{ key: 'dude', frame: 10 } ],
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'down',
                frames: [ { key: 'dude', frame: 5 },{ key: 'dude', frame: 8 },{ key: 'dude', frame: 11 } ],
                frameRate: 10,
                repeat: -1
            });

            //  Input Events
            this.input.keyboard.on('keyup_I', function(e){
            
                if(this.inRange(this.sekretaer,30,70)){
                    this.inDialog = true;
                    this.actualDialog = this.DialogEmpfang;
                    console.log(this.actualDialog);
                    this.actualTask = this.undefined;
                    this.DialogEmpfangDone = true;
                    this.toggleDialog();
                    document.getElementById("Hinweis").innerHTML = "Gehe auf die rechte Tür zu und drücke die Interaktionstaste um hindurchzugehen!";
                }else{
                if(this.inRange(this.door,30,50) && this.DialogEmpfangDone){
                    this.scene.start("Hausmeister", {score: this.score});
                
                }else{
                    this.inDialog = true;
                    this.actualDialog = this.DialogBoot;
                    console.log(this.actualDialog);

                    this.actualTask = undefined;
                    this.toggleDialog();
                }
            }
        },this);
        
        this.Key_W =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.Key_A =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Key_S =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.Key_D =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.DialogEmpfang.add(this.add.text(240,430,"Willkommen bei der Firma KRONE!\n\nWie kann ich ihnen behilflich\nsein?",{font:"18px Courier"}).setColor("black"));
        this.DialogEmpfang.add(this.add.text(240,430,"Oh, du bist also "+this.user+",\nunser neuer Praktikant.\n\nIch habe dich schon erwartet!",{font:"18px Courier"}).setColor("black"));
        this.DialogEmpfang.add(this.add.text(240,430,"Du musst zuerst zu unserem\nHausverwalter, um einen Ausweis\nund eine erste Einweisung\nzu erhalten.",{font:"18px Courier"}).setColor("black"));
        this.DialogEmpfang.add(this.add.text(240,430,"Gehe einfach durch die Tür dort\ndrüben!",{font:"18px Courier"}).setColor("black"));
        this.DialogEmpfang.toggleVisible();

        this.DialogBoot.add(this.add.text(240,430,"Willkommen in unserem \nIT-Security Game!",{font:"18px Courier"}).setColor("black"));
        this.DialogBoot.add(this.add.text(240,430,"Du beginnst heute deinen\nersten Tag bei der Firma KRONE.",{font:"18px Courier"}).setColor("black"));
        this.DialogBoot.add(this.add.text(240,430,"Als Praktikant erhoffst du dir\nwertvolle Erfahrungen zu\nsammeln, die dir später einmal\nweiterhelfen weden...",{font:"18px Courier"}).setColor("black"));
        this.DialogBoot.add(this.add.text(240,430,"Du solltest dich zunächst am\nEmpfang melden...",{font:"18px Courier"}).setColor("black"));
        this.DialogBoot.toggleVisible();
           
        this.inDialog = true;
        this.actualDialog = this.DialogBoot;
        this.actualTask = undefined;
        this.toggleDialog();
            
        }

    update ()
    {
        if (this.Key_W.isDown){
            this.player.setVelocityY(-160);
            this.player.anims.play('up', true);
            this.Key_A.enabled = false;
            this.Key_S.enabled = false;
            this.Key_D.enabled = false;
        }else{
            if((this.time.now - this.Key_W.timeUp) <= 500){
                //console.log(this.time.now);
                this.player.setVelocityY(0);
                this.player.anims.stop();
                this.Key_A.enabled = true;
                this.Key_S.enabled = true;
                this.Key_D.enabled = true;
            }
        }
        if (this.Key_A.isDown){
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            this.Key_W.enabled = false;
            this.Key_S.enabled = false;
            this.Key_D.enabled = false;
        }else{
            if((this.time.now - this.Key_A.timeUp) <= 500){
                //console.log(this.Key_W.timeDown);
                this.player.setVelocityX(0);
                this.player.anims.stop();
                this.Key_W.enabled = true;
                this.Key_S.enabled = true;
                this.Key_D.enabled = true;
            }
        }
        if (this.Key_S.isDown){
            this.player.setVelocityY(160);
            this.player.anims.play('down', true);
            this.Key_A.enabled = false;
            this.Key_W.enabled = false;
            this.Key_D.enabled = false;
        }else{
            if((this.time.now - this.Key_S.timeUp) <= 500){
                //console.log(this.Key_W.timeDown);
                this.player.setVelocityY(0);
                this.player.anims.stop();
                this.Key_A.enabled = true;
                this.Key_W.enabled = true;
                this.Key_D.enabled = true;
            }
        }
        if (this.Key_D.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
            this.Key_W.enabled = false;
            this.Key_S.enabled = false;
            this.Key_A.enabled = false;
        }else{
            if((this.time.now - this.Key_D.timeUp) <= 500){
                //console.log(this.Key_W.timeDown);
                this.player.setVelocityX(0);
                this.player.anims.stop();
                this.Key_W.enabled = true;
                this.Key_S.enabled = true;
                this.Key_A.enabled = true;
            }
        }
    }
 
    inRange(objekt,x,y){
            //console.log("Player-x:"+this.player.x);
            //console.log("Player-y:"+this.player.y);
            //console.log("Laptop-x:"+objekt.x);
            //console.log("Laptop-y:"+objekt.y);
            //1. Zu weit rechts 2. zu weit links 3. zu weit unten 4. zu weit oben
        if ((this.player.x <= objekt.x+x && this.player.x >= objekt.x-x) && (this.player.y <= objekt.y + y && this.player.y >= objekt.y - y)){
            return true;
        }else
        {
            return false;
        }
    }
    makeImmovable(objekt){
        objekt.body.immovable = true; objekt.body.moves = false; objekt.allowGravity = false;objekt.body.gravity.x = 0;objekt.body.gravity.y = 0;objekt.body.velocity.x = 0;objekt.body.velocity.y = 0;  

    }

    toggleDialog(){
        if(this.actualDialog != undefined){
            var children = this.actualDialog.getChildren();
            console.log(children);
            var firstRun = true;
            var changedSomething = false;
            for(var i = 0; (i < children.length)&&!changedSomething;i++){
                if(children[i].visible == true){
                    changedSomething = true;
                        firstRun = false;
                        children[i].setVisible(false);
                        console.log(i);
                        console.log(children[i]);
                        if(i != children.length-1){
                            children[i+1].setVisible(true);   
                        }else{
                            if(this.actualTask != undefined){
                                children[i].setVisible(true);;
                                this.actualDialog = undefined;
                                this.actualTask = undefined;
                            }else{
                                this.Key_W.enabled = true;
                                this.Key_A.enabled = true;
                                this.Key_S.enabled = true;
                                this.Key_D.enabled = true;
                                this.Dialog.setVisible(false);
                                this.inDialog = false;
                                this.actualDialog = undefined;
                                this.actualTask = undefined;
                            }   
                        }
                    }    
            }
            if(firstRun){
                //console.log(i);
                this.Dialog.setVisible(true);
                children[0].setVisible(true);
                this.Key_W.enabled = false;
                this.Key_A.enabled = false;
                this.Key_S.enabled = false;
                this.Key_D.enabled = false;
            }
        }    
    }

}
