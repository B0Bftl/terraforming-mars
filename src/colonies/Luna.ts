import { Colony, IColony } from './Colony';
import { Player } from '../Player';
import { PlayerInput } from '../PlayerInput';
import { ColonyName } from './ColonyName';
import { Resources } from '../Resources';
import { Game } from '../Game';
import { LogHelper } from '../components/LogHelper';

export class Luna extends Colony implements IColony {
    public name = ColonyName.LUNA;
    public description: string = "MegaCredits";
    public trade(player: Player, game: Game, usesTradeFleet: boolean = true): void {
        if (usesTradeFleet) this.beforeTrade(this, player, game);
        
        const qty = this.trackPosition * 2 + Math.max(this.trackPosition - 2, 0) + Math.max(this.trackPosition - 5, 0);
        player.megaCredits += qty;
        LogHelper.logGainStandardResource(game, player, Resources.MEGACREDITS, qty);

        if (usesTradeFleet) this.afterTrade(this, player, game);
    }
    public onColonyPlaced(player: Player, game: Game): undefined {
        super.addColony(this, player, game);
        player.addProduction(Resources.MEGACREDITS, 2);
        return undefined;
    }
    public giveTradeBonus(player: Player): undefined | PlayerInput {
        player.megaCredits += 2;
        return undefined;
    }    
}
