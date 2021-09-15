class AvgCompletionCalculator
{
	wantedCompletions = 0;
	killCount = 0;
	drops = new Array();
	dropCompletions = new Array();
	rand = java.util.Random(window.performance.now());
	constructor(wantedCompletions)
	{
		this.wantedCompletions = wantedCompletions;
	}
	addDrop(droprate)
	{
		(this.drops.push(droprate) > 0);
		(this.dropCompletions.push(0) > 0);
	}
	isComplete()
	{
		for (const i of this.dropCompletions)
		{
			if (i < this.wantedCompletions)
			{
				return false;
			}
		}
		return true;
	}
	completeBoss()
	{
		while (!this.isComplete())
		{
			this.killCount++;
			for (var i = 0; i < this.drops.length; i++)
			{
				var roll = this.rand.nextInt(this.drops[i] + 1);
				if (roll == this.drops[i])
				{
					this.dropCompletions[i] = this.dropCompletions[i] + 1;
					i = this.drops.length + 1;
				}
			}
		}
	}
	static
	main(args)
	{
		var completions = 0;
		var runs = 100000;
		try
		runs = Integer.parseInt(args[0]);
		catch (var ignored = null)
		var droprates = new Array();
		var in = java.util.Scanner(java.lang.System.in);
		var input = -1;
		while (input != 0)
		{
			console.log("Input droprate of wanted item.");
			console.log("Stop by inputting \'0\': ");
			try
			input = Integer.parseInt( in .nextLine());
			catch (var e = null)
			console.log("");
			console.log("Please input a positive integer..");
			return;
			if (input != 0)
			{
				(droprates.push(input) > 0);
			}
		}
		console.log();
		console.log("Input how many completions you want: ");
		completions = Integer.parseInt( in .nextLine());
		var completionTime = new Array();
		var ac = null;
		for (var i = 0; i < runs; i++)
		{
			ac = new AvgCompletionCalculator(completions);
			for (const x of droprates)
			{
				ac.addDrop(x);
			}
			ac.completeBoss();
			(completionTime.push(ac.killCount) > 0);
		}
		Collections.sort(completionTime);
		var totalKills = 0;
		for (var i = 0; i < runs; i++)
		{
			totalKills += completionTime[i];
		}
		var average = totalKills / runs;
		console.log("Average: " + average);
		console.log("Median: " + completionTime[parseInt((parseInt(runs / 2)))]);
		console.log("Best: " + completionTime[0]);
		console.log("Worst: " + completionTime[runs - 1]);
	}
}
AvgCompletionCalculator.main([]);
