import React, { useState } from "react";
import {
  YStack,
  XStack,
  Button,
  Input,
  Text,
  ScrollView,
  Sheet,
  Card,
  Form,
} from "tamagui";
import { Ionicons } from "@expo/vector-icons";

interface AsthmaEntry {
  id: string;
  place: string;
  year: number;
  month: number;
  day: number;
  hour: number;
}

interface DateTimeInputs {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export default function AsthmaEntriesPage() {
  const [entries, setEntries] = useState<AsthmaEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [place, setPlace] = useState("");
  const [dateTime, setDateTime] = useState<DateTimeInputs>({
    year: "",
    month: "",
    day: "",
    hour: "",
  });

  const validateDateTime = (dt: DateTimeInputs): boolean => {
    const year = parseInt(dt.year);
    const month = parseInt(dt.month);
    const day = parseInt(dt.day);
    const hour = parseInt(dt.hour);

    return (
      year >= 2000 &&
      year <= 2100 &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31 &&
      hour >= 0 &&
      hour <= 23
    );
  };

  const handleAddEntry = () => {
    if (place.trim() && validateDateTime(dateTime)) {
      const newEntry: AsthmaEntry = {
        id: Date.now().toString(),
        place,
        year: parseInt(dateTime.year),
        month: parseInt(dateTime.month),
        day: parseInt(dateTime.day),
        hour: parseInt(dateTime.hour),
      };
      setEntries([...entries, newEntry]);
      setPlace("");
      setDateTime({ year: "", month: "", day: "", hour: "" });
      setShowForm(false);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const formatDateTime = (entry: AsthmaEntry) => {
    return `${entry.day}/${entry.month}/${entry.year} ${entry.hour}:00`;
  };

  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
      {/* Header */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom="$4"
        marginTop="$6"
      >
        <Text fontSize="$8" fontWeight="bold">
          Asthma Entries
        </Text>
        <Button
          icon={<Ionicons name="add" size={24} />}
          onPress={() => setShowForm(true)}
          theme="active"
        >
          Add Entry
        </Button>
      </XStack>

      {/* Entries List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack space="$3">
          {entries.length === 0 ? (
            <Text textAlign="center" color="$gray10" marginTop="$8">
              No entries yet. Add your first one!
            </Text>
          ) : (
            entries.map((entry) => (
              <Card
                key={entry.id}
                padding="$4"
                animation="quick"
                pressStyle={{ scale: 0.98 }}
              >
                <XStack justifyContent="space-between" alignItems="center">
                  <YStack>
                    <Text fontSize="$5" fontWeight="bold">
                      {entry.place}
                    </Text>
                    <Text color="$gray10" fontSize="$4">
                      {formatDateTime(entry)}
                    </Text>
                  </YStack>
                  <Button
                    icon={<Ionicons name="trash" size={20} color="$red10" />}
                    onPress={() => handleDeleteEntry(entry.id)}
                    backgroundColor="transparent"
                    pressStyle={{ scale: 0.9 }}
                  />
                </XStack>
              </Card>
            ))
          )}
        </YStack>
      </ScrollView>

      {/* Add Entry Sheet */}
      <Sheet
        modal
        open={showForm}
        onOpenChange={setShowForm}
        snapPoints={[50]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          <YStack space="$4">
            <Text fontSize="$6" fontWeight="bold">
              Add New Entry
            </Text>
            <Form onSubmit={handleAddEntry}>
              <Input
                placeholder="Enter location"
                value={place}
                onChangeText={setPlace}
                marginBottom="$2"
              />

              <XStack space="$2" marginBottom="$2">
                <Input
                  flex={1}
                  placeholder="Year"
                  value={dateTime.year}
                  onChangeText={(text) =>
                    setDateTime({
                      ...dateTime,
                      year: text.replace(/[^0-9]/g, ""),
                    })
                  }
                  keyboardType="numeric"
                  maxLength={4}
                />
                <Input
                  flex={1}
                  placeholder="Month (1-12)"
                  value={dateTime.month}
                  onChangeText={(text) =>
                    setDateTime({
                      ...dateTime,
                      month: text.replace(/[^0-9]/g, ""),
                    })
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </XStack>

              <XStack space="$2" marginBottom="$4">
                <Input
                  flex={1}
                  placeholder="Day (1-31)"
                  value={dateTime.day}
                  onChangeText={(text) =>
                    setDateTime({
                      ...dateTime,
                      day: text.replace(/[^0-9]/g, ""),
                    })
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Input
                  flex={1}
                  placeholder="Hour (0-23)"
                  value={dateTime.hour}
                  onChangeText={(text) =>
                    setDateTime({
                      ...dateTime,
                      hour: text.replace(/[^0-9]/g, ""),
                    })
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </XStack>

              <XStack space="$2" justifyContent="flex-end">
                <Button onPress={() => setShowForm(false)} variant="outlined">
                  Cancel
                </Button>
                <Button theme="active" onPress={handleAddEntry}>
                  Add Entry
                </Button>
              </XStack>
            </Form>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}
